using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace liyobe.WebApi.Installers
{
    public interface IInstaller
    {
        void InstallServices(IServiceCollection services, IConfiguration configuration);
    }
}