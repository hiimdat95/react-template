using AutoMapper;
using liyobe.ApplicationCore.AutoMapper;
using liyobe.ApplicationCore.Interfaces;
using liyobe.Data;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;
using liyobe.Models.Entities;
using liyobe.Services;
using liyobe.WebApi.Installers;
using liyobe.WebApi.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using SwaggerOptions = liyobe.WebApi.Options.SwaggerOptions;

namespace liyobe.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup).Assembly);
            // Add application services.
            services.AddScoped<UserManager<AppUsers>, UserManager<AppUsers>>();
            services.AddScoped<RoleManager<AppRoles>, RoleManager<AppRoles>>();

            services.AddSingleton(AutoMapperConfig.RegisterMappings().CreateMapper());
            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IAsyncRepository<,>), typeof(EFRepository<,>));
            services.AddTransient<IFunctionsService, FunctionsService>();

            services.AddTransient<DbInitializer>();

            services.InstallServicesInAssembly(_configuration);
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }
            app.UseStaticFiles();
            app.UseIdentityServer();
            var swaggerOptions = new SwaggerOptions();
            _configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(option => { option.RouteTemplate = swaggerOptions.JsonRoute; });

            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description);
            });

            app.UseMvc();
        }
    }
}