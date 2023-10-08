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
        private readonly DepDiaryContext depDiary;
        private readonly DbSet<Users> usersContext;

        public UserController(DepDiaryContext _depDiary)
        {
            depDiary = _depDiary;
            usersContext = depDiary.Users;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetUserList()
        {
            var userList = await usersContext.AsNoTracking().ToListAsync();

            return Ok(userList);
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await usersContext.FirstOrDefaultAsync(x => x.UserId == userId);

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

            await usersContext.AddRangeAsync(user);
            await depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("update/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, UpdateUserRequest updateUserRequest)
        {
            var user = await usersContext.FindAsync(userId);

            if (user == null)
                return NotFound();

            user.Username = updateUserRequest.Username;
            user.Password = updateUserRequest.Password; 
            user.Email = updateUserRequest.Email;

            await depDiary.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("delete/{userId}")]

        public async Task<IActionResult> DeleteUser(int userId)
        {
            var user = await usersContext.FindAsync(userId);
            if (user == null)
                return NotFound();

            usersContext.Remove(user);
            await depDiary.SaveChangesAsync();

            return Ok();
        }
    }
}
