using liyobe.ApplicationCore.ViewModels.System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace liyobe.Services.Interfaces
{
    public interface IFunctionService
    {
        Task<List<FunctionListViewModel>> GetAll();

        Task<FunctionListViewModel> GetById(string functionId);
    }
}