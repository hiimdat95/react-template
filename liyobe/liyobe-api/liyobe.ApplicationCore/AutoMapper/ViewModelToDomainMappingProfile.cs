using AutoMapper;
using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Models.Entities;
using System;

namespace liyobe.ApplicationCore.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<AppUserViewModel, AppUser>()
                    .ConstructUsing(c => new AppUser(c.Id.GetValueOrDefault(Guid.Empty), c.FullName, c.UserName,
                    c.Email, c.PhoneNumber, c.Avatar, c.Status));
            CreateMap<FunctionListViewModel, Function>();
            CreateMap<LocaleListViewModel, Locale>();
        }
    }
}