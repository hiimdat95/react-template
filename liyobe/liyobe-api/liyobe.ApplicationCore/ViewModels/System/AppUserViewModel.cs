using System;
using System.Collections.Generic;

namespace liyobe.ApplicationCore.ViewModels.System
{
    public class AppUserViewModel
    {
        public AppUserViewModel()
        {
            Roles = new List<string>();
        }

        public Guid? Id { set; get; }
        public string FullName { set; get; }
        public string BirthDay { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string UserName { set; get; }
        public string PhoneNumber { set; get; }
        public string Avatar { get; set; }
        public bool Status { get; set; }

        public DateTime DateCreated { get; set; }

        public List<string> Roles { get; set; }
    }
}