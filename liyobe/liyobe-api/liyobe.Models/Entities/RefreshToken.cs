using liyobe.Infrastructure.SharedKernel;
using liyobe.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace liyobe.Models.Entities
{
    public class RefreshToken : BaseEntity<int>, IDateTracking
    {
        public string Token { get; private set; }
        public DateTime Expires { get; private set; }
        public int UserId { get; private set; }
        public bool Active => DateTime.UtcNow <= Expires;
        public string RemoteIpAddress { get; private set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public RefreshToken(string token, DateTime expires, int userId, string remoteIpAddress)
        {
            Token = token;
            Expires = expires;
            UserId = userId;
            RemoteIpAddress = remoteIpAddress;
        }
    }
}
