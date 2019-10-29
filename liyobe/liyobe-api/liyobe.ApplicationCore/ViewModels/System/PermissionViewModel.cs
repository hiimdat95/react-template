using System;

namespace liyobe.ApplicationCore.ViewModels.System
{
    public class PermissionViewModel
    {
        public int Id { get; set; }
        public Guid RoleId { get; set; }
        public string FunctionId { get; set; }
        public bool CanCreate { set; get; }
        public bool CanRead { set; get; }
        public bool CanUpdate { set; get; }
        public bool CanDelete { set; get; }
        public AppUserRoleViewModel AppRole { get; set; }
        public FunctionListViewModel Function { get; set; }
        public bool IsDeleted { get; set; }
    }
}