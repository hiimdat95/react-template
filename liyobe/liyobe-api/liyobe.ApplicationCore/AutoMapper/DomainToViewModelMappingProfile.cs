using AutoMapper;
using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace liyobe.ApplicationCore.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Function, FunctionListViewModel>();
            CreateMap<AppUser, AppUserViewModel>().ForMember(x => x.Password, o => o.MapFrom(y => y.PasswordHash));
            CreateMap<AppRole, AppUserRoleViewModel>();
            CreateMap<Locale, LocaleListViewModel>();

        }
    }
}