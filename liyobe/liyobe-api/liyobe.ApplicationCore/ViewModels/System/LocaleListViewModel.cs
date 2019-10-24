using System.ComponentModel.DataAnnotations;

namespace liyobe.ApplicationCore.ViewModels.System
{
    public class LocaleListViewModel
    {
        public string Id { get; set; }

        [Required]
        [StringLength(128)]
        public string LocaleName { set; get; }

        [StringLength(250)]
        public string Description { get; set; }

        public bool Status { get; set; }
        public int SortOrder { get; set; }
    }
}