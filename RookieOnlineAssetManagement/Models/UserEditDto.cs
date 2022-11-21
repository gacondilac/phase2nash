using RookieOnlineAssetManagement.Enum;
using System;

namespace RookieOnlineAssetManagement.Models
{
    public class UserEditDto
    {
        public string Id { get; set; }
        public DateTime JoinedDay { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Gender { get; set; }
        public string Type { get; set; }
    }
}
