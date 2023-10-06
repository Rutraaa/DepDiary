using DepDiary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DepDiaryContext depDiary;

        public UserController(DepDiaryContext _depDiary)
        {
            depDiary = _depDiary;
        }

        [HttpGet]
        public IActionResult GetUserList()
        {
            var userList = depDiary.Users.ToList();

            return Ok(userList);
        }

    }
}
