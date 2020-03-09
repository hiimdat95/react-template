using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace liyobe.Infrastructure.Interfaces.Auth
{
    public interface IJwtTokenValidator
    {
        ClaimsPrincipal GetPrincipalFromToken(string token, string signingKey);
    }
}
