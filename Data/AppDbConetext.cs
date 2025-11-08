using LoginRegister.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace LoginRegister.Data
{
    public class AppDbConetext:DbContext
    {
        public AppDbConetext(DbContextOptions<AppDbConetext>options):base(options)
        {
           
        }
        public DbSet<User> Users => Set<User>();
    }
}
