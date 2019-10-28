using AutoMapper;
using liyobe.ApplicationCore.Interfaces;
using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;
using liyobe.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace liyobe.Services
{
    public class UserService : IUserService
    {
        private readonly IAsyncRepository<AppUsers, Guid> _userAsynRepository;
        private readonly IRepository<AppUsers, Guid> _userRepository;
        private readonly IAsyncRepository<AppRoles, Guid> _appRoleAsyncRepository;
        private readonly IRepository<AppRoles, Guid> _appRoleRepository;
        private readonly UserManager<AppUsers> _userManager;
        private readonly RoleManager<AppRoles> _roleManager;
        //private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UserService(IMapper mapper, 
            IAsyncRepository<AppUsers, Guid> userAsynRepository, IRepository<AppUsers, Guid> userRepository,
            IAsyncRepository<AppRoles, Guid> appRoleAsyncRepository, IRepository<AppRoles, Guid> appRoleRepository,
            UserManager<AppUsers> userManager, RoleManager<AppRoles> roleManager,
            IUnitOfWork unitOfWork)
        {
            this._mapper = mapper;
            this._userAsynRepository = userAsynRepository;
            this._userRepository = userRepository;
            this._appRoleAsyncRepository = appRoleAsyncRepository;
            this._appRoleRepository = appRoleRepository;
            this._userManager = userManager;
            this._roleManager = roleManager;
            //this._unitOfWork = unitOfWork;
        }
        
        public Task<bool> AddAsync(AppUserViewModel userVm)
        {
            throw new NotImplementedException();
        }

        public AppUserViewModel Authenticate(string userName, string passWord)
        {
            //var user = _userRepository.ListAll().AsQueryable().Where(x=>x.UserName==userName && x.)
            throw new NotImplementedException();
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<AppUserViewModel>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AppUserViewModel> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(AppUserViewModel userVm)
        {
            throw new NotImplementedException();
        }
    }
}
