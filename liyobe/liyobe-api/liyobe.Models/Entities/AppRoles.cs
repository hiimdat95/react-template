using liyobe.Utilities.Extensions;
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace liyobe.Models.Entities
{
    [Table(TablesConstant.AppRoles)]
    public class AppRoles : IdentityRole<Guid> 
    {
        public AppRoles() : base()
        {
        }

        public AppRoles(string name, string description) : base(name)
        {
            this.Description = description;
        }

        [StringLength(250)]
        public string Description { get; set; }
    }
}