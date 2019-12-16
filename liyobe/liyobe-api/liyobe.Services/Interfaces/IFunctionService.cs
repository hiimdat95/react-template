using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Utilities.BusinessObjects;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace liyobe.Services.Interfaces
{
    public interface IFunctionService
    {
        Task<GenericResult<List<FunctionListViewModel>>> GetAll();

        Task<FunctionListViewModel> GetById(string functionId);
    }
}