using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Utilities.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace liyobe.Services.Interfaces
{
    public interface ILocaleService
    {
        Task<GenericResult<List<LocaleListViewModel>>> GetAll();
        Task<LocaleListViewModel> GetById(string functionId);
    }
}
