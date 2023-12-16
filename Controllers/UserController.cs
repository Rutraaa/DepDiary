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
        private readonly DbSet<Diaries> _diariesContext;
        private readonly DbSet<Notes> _notesContext;

		public UserController(DepDiaryContext depDiary)
        {
            _depDiary = depDiary;
            _usersContext = _depDiary.Users;
            _diariesContext = _depDiary.Diaries;
            _notesContext = _depDiary.Notes;
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

            var userDiaries = await _diariesContext.Where(diary => diary.UserId == user.UserId).ToListAsync();

            if (userDiaries.Count != 0)
            {
				foreach (var diary in userDiaries)
				{
					var userNotePerDiary = await _notesContext.Where(note => note.DiaryId == diary.DiaryId).ToListAsync();

					if (userNotePerDiary.Count != 0)
					{
						_notesContext.RemoveRange(userNotePerDiary);
						await _depDiary.SaveChangesAsync();
					}
				}
	            _diariesContext.RemoveRange(userDiaries);
			}

            _usersContext.Remove(user);
            await _depDiary.SaveChangesAsync();

            return Ok();
        }
    }
}
