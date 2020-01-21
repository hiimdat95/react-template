using liyobe.Models.Entities;
using System;

namespace liyobe.Identity.Models
{
    public class RegisterResponseViewModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public RegisterResponseViewModel(AppUser user)
        {
            Id = user.Id;
            UserName = user.UserName;
            Email = user.Email;
        }
    }
}