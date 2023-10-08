using DepDiary.Entities;
using DepDiary.Models.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
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
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateUser(AddUserRequest addUserRequest)
        {
            var user = new Users
            {
                Username = addUserRequest.Username,
                Password = addUserRequest.Password,
                Email = addUserRequest.Email
            };

            await _usersContext.AddRangeAsync(user);
            await _depDiary.SaveChangesAsync();

            return Ok();
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
                return NotFound();

            _usersContext.Remove(user);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }
    }
}
