using DepDiary.Entities;
using DepDiary.Models.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace DepDiary.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DepDiaryContext _depDiary;
        private readonly IConfiguration _configuration;
        private readonly DbSet<Users> _usersContext;

        public AuthController(DepDiaryContext depDiary, IConfiguration configuration)
        {
            _depDiary = depDiary;
            _configuration = configuration;
            _usersContext = _depDiary.Users;

        }

        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> Registration(AddUserRequest addUserRequest)
        {
            var emailExists = await _usersContext.
                Where(user => user.Email == addUserRequest.Email)
                .AnyAsync();

            if (emailExists)
                return BadRequest("Current email is already exist");

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

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser(UserLogin userLogin)
        {
            Users? user = await _usersContext.FirstAsync(item => item.Email == userLogin.Email && item.Password == userLogin.Password);

            if (user == null)
                return NotFound("User not found");

            string token = "bearer " + CreateToken(user.Username);

            var result = new UserAuth
            {
                userId = user.UserId,
                token = token
            };

            return Ok(result);
        }

        private string CreateToken(string Username)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, Username)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
