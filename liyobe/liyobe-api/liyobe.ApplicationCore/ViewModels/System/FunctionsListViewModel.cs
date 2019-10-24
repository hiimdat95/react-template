using System.ComponentModel.DataAnnotations;

namespace liyobe.ApplicationCore.ViewModels.System
{
    public class FunctionsListViewModel
    {
        public string Id { get; set; }

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