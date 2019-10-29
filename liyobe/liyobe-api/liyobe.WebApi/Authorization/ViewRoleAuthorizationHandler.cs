using liyobe.ApplicationCore;
using liyobe.Utilities.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace liyobe.WebApi.Authorization
{
    public class ViewRoleAuthorizationRequirement : IAuthorizationRequirement
    {
    }

    public class ViewRoleAuthorizationHandler : AuthorizationHandler<ViewRoleAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ViewRoleAuthorizationRequirement requirement, string roleName)
        {
            if (context.User == null)
                return Task.CompletedTask;

            if (context.User.HasClaim(CustomClaimTypes.Permission, ApplicationPermissions.ViewRoles) || context.User.IsInRole(roleName))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}