using System.ComponentModel.DataAnnotations;

namespace liyobe.ApplicationCore.ViewModels.System
{
    public class ErrorViewModel
    {
        [Display(Name = "Error")]
        public string Error { get; set; }

        [Display(Name = "Description")]
        public string ErrorDescription { get; set; }
    }
}