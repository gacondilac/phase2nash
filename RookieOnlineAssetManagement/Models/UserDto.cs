using RookieOnlineAssetManagement.Enum;
using System;

namespace RookieOnlineAssetManagement.Models
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime JoinedDay { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Gender { get; set; }
        public UserType Type { get; set; }
    }
}
