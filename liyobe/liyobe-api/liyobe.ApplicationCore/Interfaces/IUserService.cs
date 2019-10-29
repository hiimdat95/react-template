using liyobe.ApplicationCore.ViewModels.System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace liyobe.ApplicationCore.Interfaces
{
    public interface IUserService
    {
        Task<bool> AddAsync(AppUserViewModel userVm);

        Task DeleteAsync(string id);

        Task<List<AppUserViewModel>> GetAllAsync();

        //PagedResult<AppUserViewModel> GetAllPagingAsync(string keyword, int page, int pageSize);

        Task<AppUserViewModel> GetById(string id);

        Task UpdateAsync(AppUserViewModel userVm);

        AppUserViewModel Authenticate(string userName, string passWord);
    }
}
