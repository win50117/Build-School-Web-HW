using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CoreWebApi_TodoApi2.Models;

namespace CoreWebApi_TodoApi2.Data
{
    public class TodoItemContext : DbContext
    {
        public TodoItemContext (DbContextOptions<TodoItemContext> options)
            : base(options)
        {
        }

        public DbSet<CoreWebApi_TodoApi2.Models.TodoItem> TodoItem { get; set; }
    }
}
