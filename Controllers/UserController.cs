using DepDiary.Entities;
using DepDiary.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly DepDiaryContext _depDiary;
        private readonly DbSet<Users> _usersContext;

        public UserController(DepDiaryContext depDiary)
        {
            _depDiary = depDiary;
            _usersContext = _depDiary.Users;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetUserList()
        {
            var userList = await _usersContext.AsNoTracking().ToListAsync();

            return Ok(userList);
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _usersContext.FirstOrDefaultAsync(x => x.UserId == userId);

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        [HttpPut]
        [Route("update/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, UpdateUserRequest updateUserRequest)
        {
            var user = await _usersContext.FindAsync(userId);

            if (user == null)
                return NotFound();

            user.Username = updateUserRequest.Username;
            user.Password = updateUserRequest.Password; 
            user.Email = updateUserRequest.Email;

            await _depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var user = await _usersContext.FindAsync(userId);
            if (user == null)
                return NotFound("User not found");

            _usersContext.Remove(user);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }
    }
}
