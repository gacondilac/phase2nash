
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Enum;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{

    public class UserRepository : IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public UserRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<UserModel>> GetAllAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserModel>>(users);
        }

        //_mapper.map<userviewmodel>(user);
        public async Task<UserDto> GetAsync(string id)
        {

            var user = await _context.Users.Where(p => p.Id == id).FirstOrDefaultAsync();
            var userdto= _mapper.Map<UserDto>(user);
            return _mapper.Map<UserDto>(user);

        }

        public async Task<UserEditDto> UpdateAsync(UserEditDto userDto)
        {
            try
            {
                var user = _context.Users.Find(userDto.Id);

                if (user != null)
                {
                    int age = ((int)((DateTime.Now - userDto.DateofBirth).TotalDays / 365));
                    if (age < 18 || age > 100)
                    {
                        return null;
                    }

                    if (userDto.Gender != "Female" && userDto.Gender != "Male")
                    {
                        return null;
                    }
                    if (userDto.Type != "Admin" && userDto.Type != "Staff")
                    {
                        return null;
                    }

                    user.DateofBirth = userDto.DateofBirth;
                    if (userDto.Gender != null)
                    {
                        if (userDto.Gender == "Female")
                            user.Gender = Gender.Female;
                        else
                            user.Gender = Gender.Male;
                    }
                    user.JoinedDay = userDto.JoinedDay;

                    if(userDto.Type=="Admin")
                        user.Type=UserType.Admin;
                    else
                        user.Type = UserType.Staff;

                    _context.Users.Update(user);

                    await _context.SaveChangesAsync();
                    return userDto;
                }
                else
                {
                    return null;
                }

                return userDto;
            }
            catch (Exception)
            {
                return userDto;
            }


        }

    }
}
