using LoginRegister.Data;
using LoginRegister.DTOs;
using LoginRegister.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LoginRegister.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(AppDbConetext context) : ControllerBase
    {
        private readonly AppDbConetext _context = context;
        private readonly PasswordHasher<User> _passwordHasher = new();

        [HttpPost("register")]
        public IActionResult Register(RegisterDTOs regdto)
        {
            if (_context.Users.Any(u => u.Username == regdto.Username))
            {
                return BadRequest("Username already exists.");
            }

            var user = new User { Username = regdto.Username };
            user.PasswordHash = _passwordHasher.HashPassword(user,regdto.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User Registered Succussfully.");

        }

        [HttpPost("login")]

        public IActionResult Login(LoginDTOs logdto)
        {
            var user = _context.Users.FirstOrDefault(u=>u.Username == logdto.Username);
            if(user == null)
            {
                return BadRequest("Invalid Username or Password.");
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash,logdto.Password);
            if(result== PasswordVerificationResult.Failed)
            {
                return BadRequest("Invalid Username or Password.");
            }

            return Ok("Login Successful.");
        }

       
    }
}
