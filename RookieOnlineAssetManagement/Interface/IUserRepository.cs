using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IUserRepository
    {
        public Task<List<UserModel>> GetAllAsync();
        public Task<UserDto> GetAsync(string id);
        public Task<UserEditDto> UpdateAsync(UserEditDto userEditDto);

    }
}
