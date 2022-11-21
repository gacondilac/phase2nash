using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
   // [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;

        public UsersController(ILogger<UsersController> logger, UserManager<User> userManager, IUserRepository userRepository)
        {
            _logger = logger;
            _userManager = userManager;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<UserModel>> Get()
        {
            _logger.LogInformation("Getting all products");
            var currUser = await _userManager.GetUserAsync(User);
            return Ok(currUser);
        }
        [HttpGet("{staffcode}")]
        public async Task<ActionResult<UserDto>> GetById(string staffCode)
        {
            var user = await _userRepository.GetAsync(staffCode);
            if (user == null)
            {
                return BadRequest("Can not find the user");
            }
            return Ok(user);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(UserEditDto userDto)
        {
            var user = await _userRepository.UpdateAsync(userDto);
            if (user == null)
                return BadRequest();
            return Ok();
        }
    }
}
