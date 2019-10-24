using liyobe.ApplicationCore.ViewModels.System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace liyobe.ApplicationCore.Interfaces
{
    public interface IFunctionsService
    {
        Task<List<FunctionsListViewModel>> GetAll();

        Task<FunctionsListViewModel> GetById(string functionId);
    }
}