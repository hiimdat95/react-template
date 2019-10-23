using liyobe.Models.Interfaces;
using liyobe.Utilities.Extensions;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace liyobe.Models.Entities
{
    [Table(TablesConstant.AppUsers)]
    public class AppUsers : IdentityUser<Guid>, IDateTracking, ISwitchable
    {
        public AppUsers()
        {
        }

        public AppUsers(Guid id, string fullName, string userName,
            string email, string phoneNumber, string avatar, bool status)
        {
            Id = id;
            FullName = fullName;
            UserName = userName;
            Email = email;
            PhoneNumber = phoneNumber;
            Avatar = avatar;
            Status = status;
        }

        public string FullName { get; set; }

        public DateTime? BirthDay { set; get; }

        public decimal Balance { get; set; }

        public string Avatar { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool Status { get; set; }
    }
}