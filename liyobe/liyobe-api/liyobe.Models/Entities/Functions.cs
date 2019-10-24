using liyobe.Infrastructure.SharedKernel;
using liyobe.Models.Interfaces;
using liyobe.Utilities.Extensions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace liyobe.Models.Entities
{
    [Table(TablesConstant.Functions)]
    public class Functions : BaseEntity<string>, ISwitchable, ISortable
    {
        public Functions()
        {
        }

        public Functions(string name, string url, string parentId, string iconCss, int sortOrder, bool status)
        {
            this.Name = name;
            this.URL = url;
            this.ParentId = parentId;
            this.IconCss = iconCss;
            this.SortOrder = sortOrder;
            this.Status = status;
        }

        [Required]
        [StringLength(128)]
        public string Name { set; get; }

        [Required]
        [StringLength(250)]
        public string URL { set; get; }

        [StringLength(128)]
        public string ParentId { set; get; }

        public string IconCss { get; set; }
        public int SortOrder { set; get; }
        public bool Status { set; get; }
    }
}