using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace liyobe.WebApi.Authorization
{
    public static IEnumerable<IdentityResource> GetIdentityResources()
    {
        return new List<IdentityResource>
    {
        new IdentityResource.Email(),
        new IdentityResource.Profile(),
        new IdentityResource.Phone(),
        new IdentityResource.Address()
    };
    }
}