using BeerProject.Data;
using BeerProject.Helpers;
using BeerProject.Models;
using BeerProject.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeerProject.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private BeerContext _context; 
        public UsersController(IUserService userService,BeerContext context)
        {
            _userService = userService;
            _context = context;
        }

       
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);
             

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            _userService.Authenticate(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(user.WithoutPassword());
        }
        
        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _context.User.ToListAsync();
            return users;
        }
        [HttpPost("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User user)
        {
         


            if (user.Username!=null && await _context.User.AnyAsync(u=>u.Username == user.Username))
                return BadRequest(new { message = "User is exist" });
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            _userService.Authenticate(user);
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(user.WithoutPassword());
        }
        [HttpGet("{tocken}")]
        public async Task<IActionResult> GetByTocken(string tocken)
        {
            // only allow admins to access other user records
            //var currentUserId = int.Parse(User.Identity.Name);
            //if (id != currentUserId && !User.IsInRole(Role.Admin))
            //    return Forbid();

            var user = await _context.User.FirstOrDefaultAsync(u => tocken == u.Token);

            if (user == null)
                return NotFound();

            return Ok(user.WithoutPassword());
        }

        [Route("isDupeUser")]
        [HttpPost]
        public bool IsDupeUser([FromBody] User user)
        {

            return _context.User.Any(u => u.Username == user.Username);



        }
    }
}
