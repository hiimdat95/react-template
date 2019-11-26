using liyobe.Infrastructure.SharedKernel;
using liyobe.Models.Interfaces;
using liyobe.Utilities.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace liyobe.Models.Entities
{
    [Table(TablesConstant.Locales)]
    public class Locale : BaseEntity<string>, ISwitchable, ISortable
    {
        public Locale()
        {

        }
        public Locale(string localeName, string description, bool status, int sortOrder)
        {
            this.LocaleName = localeName;
            this.Description = description;
            this.Status = status;
            this.SortOrder = sortOrder;
        }
        [Required]
        [StringLength(128)]
        public string LocaleName { set; get; }
        [StringLength(250)]
        public string Description { get; set; }
        public bool Status { get; set; }
        public int SortOrder { get; set; }
    }
}
