using liyobe.ApplicationCore.ViewModels.System;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace liyobe.Services.Interfaces
{
    public interface ILocaleService
    {
        Task<List<LocaleListViewModel>> GetAll();

        Task<LocaleListViewModel> GetById(string functionId);
    }
}
