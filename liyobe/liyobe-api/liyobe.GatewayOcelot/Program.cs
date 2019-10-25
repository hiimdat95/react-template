using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Serilog;

namespace liyobe.GatewayOcelot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //BuildWebHost(args).Run();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((host, config) =>
                {
                    config
                        .AddJsonFile("ocelot.json");
                })
                .UseStartup<Startup>();

        public static IWebHost BuildWebHost(string[] args)
        {
            IWebHostBuilder builder = WebHost.CreateDefaultBuilder(args);
            builder.ConfigureServices(s => s.AddSingleton(builder))
                .UseContentRoot(Directory.GetCurrentDirectory())
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config
                        .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                        .AddJsonFile("ocelot.json")
                        .AddEnvironmentVariables();
                })
                .UseStartup<Startup>()
                .UseIIS()
                .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration
                .ReadFrom.Configuration(hostingContext.Configuration));
                //.ConfigureLogging((hostingContext, loggingbuilder) =>
                //{
                //    loggingbuilder.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                //    loggingbuilder.AddConsole();
                //    loggingbuilder.AddDebug();
                //})
                //.ConfigureLogging((hostingContext, logging) =>
                //{
                //    logging.AddConsole();
                //});
            IWebHost host = builder.Build();
            return host;
        }
    }
}