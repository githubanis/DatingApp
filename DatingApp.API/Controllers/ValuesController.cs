using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ValueDTO>>> GetValues()
        {
            return await _context.Values
                .Select(x => ValueToDTO(x))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ValueDTO>> GetValue(int id)
        {
            var Value = await _context.Values.FindAsync(id);

            if (Value == null)
            {
                return NotFound();
            }

            return ValueToDTO(Value);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateValue(int id, ValueDTO ValueDTO)
        {
            if (id != ValueDTO.Id)
            {
                return BadRequest();
            }

            var Value = await _context.Values.FindAsync(id);
            if (Value == null)
            {
                return NotFound();
            }

            Value.Name = ValueDTO.Name;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ValueExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ValueDTO>> CreateValue(ValueDTO ValueDTO)
        {
            var Value = new Value
            {
                Name = ValueDTO.Name
            };

            _context.Values.Add(Value);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetValue),
                new { id = Value.Id },
                ValueToDTO(Value));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteValue(int id)
        {
            var Value = await _context.Values.FindAsync(id);

            if (Value == null)
            {
                return NotFound();
            }

            _context.Values.Remove(Value);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ValueExists(int id) =>
             _context.Values.Any(e => e.Id == id);

        private static ValueDTO ValueToDTO(Value Value) =>
            new ValueDTO
            {
                Id = Value.Id,
                Name = Value.Name
            };
        
    }
}
