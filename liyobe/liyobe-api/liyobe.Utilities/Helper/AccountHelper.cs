using AspNet.Security.OpenIdConnect.Primitives;
using System;
using System.Linq;
using System.Security.Claims;

namespace liyobe.Utilities.Helper
{
    public class AccountHelper
    {
        public static string GetUserId(ClaimsPrincipal user)
        {
            return user.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
        }

        public static string[] GetRoles(ClaimsPrincipal identity)
        {
            return identity.Claims
                .Where(c => c.Type == OpenIdConnectConstants.Claims.Role)
                .Select(c => c.Value)
                .ToArray();
        }
    }
}