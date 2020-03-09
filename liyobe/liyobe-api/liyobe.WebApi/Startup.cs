using AutoMapper;
using liyobe.ApplicationCore.AutoMapper;
using liyobe.Data;
using liyobe.Infrastructure.Interfaces.Auth;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;
using liyobe.Models.Entities;
using liyobe.Services.Implementations;
using liyobe.Services.Interfaces;
using liyobe.WebApi.Auth;
using liyobe.WebApi.Infrastructure;
using liyobe.WebApi.Installers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SwaggerOptions = liyobe.WebApi.Options.SwaggerOptions;

namespace liyobe.WebApi
{
    public class Startup
    {

        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup).Assembly);
            // Add application services.
            services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

            services.AddSingleton(AutoMapperConfig.RegisterMappings().CreateMapper());
            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IAsyncRepository<,>), typeof(EFRepository<,>));
            services.AddTransient<IFunctionService, FunctionService>();
            services.AddTransient<ILocaleService, LocaleService>();

            services.AddScoped<IJwtFactory, JwtFactory>();
            services.AddScoped<IJwtTokenHandler, JwtTokenHandler>();
            services.AddScoped<ITokenFactory, TokenFactory>();
            services.AddScoped<IJwtTokenValidator, JwtTokenValidator>();

            services.AddTransient<DbInitializer>();

            services.InstallServicesInAssembly(_configuration);
            services.AddCors(options =>
            {
                //options.AddPolicy(MyAllowSpecificOrigins,
                //builder =>
                //{
                //    builder.WithOrigins("http://localhost:4001",
                //                        "http://localhost:4002");

                //});
                options.AddPolicy(MyAllowSpecificOrigins,
                builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });

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
            var swaggerOptions = new SwaggerOptions();
            _configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(option => { option.RouteTemplate = swaggerOptions.JsonRoute; });

            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint(swaggerOptions.UiEndpoint, swaggerOptions.Description);
            });
            app.UseCors(MyAllowSpecificOrigins);
            app.UseMiddleware<CustomExceptionHandlerMiddleware>();
            app.UseMvc();
        }
    }
}