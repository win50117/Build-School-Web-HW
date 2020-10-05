using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreWebApi_TodoApi2.Data;
using CoreWebApi_TodoApi2.Models;

namespace CoreWebApi_TodoApi2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CRUDController : ControllerBase
    {
        private readonly TodoItemContext _context;

        public CRUDController(TodoItemContext context)
        {
            _context = context;
        }

        // GET: api/CRUD
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem()
        {
            return await _context.TodoItem.ToListAsync();
        }

        // GET: api/CRUD/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItem.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/CRUD/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CRUD
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItem.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/CRUD/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItem.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItem.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItem.Any(e => e.Id == id);
        }
    }
}