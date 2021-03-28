using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Helper;
using DatingApp.API.Models;
using DatingApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
         
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("/{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);
            if (messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;

            var messageFromRepo = await _repo.GetMessagesForUser(messageParams);
            if (messageFromRepo == null)
            {
                return NotFound();
            }

            var messages = _mapper.Map<IEnumerable<MessageToReurnDTO>>(messageFromRepo);

            Response.AddPagination(messageFromRepo.CurrentPage, messageFromRepo.PageSize, messageFromRepo.TotalCount, messageFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessagesThread(userId, recipientId);

            var messageThread = _mapper.Map<IEnumerable<MessageToReurnDTO>>(messageFromRepo);

            return Ok(messageThread);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDTO messageForCreationDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDTO.SenderId = userId;

            var recipient = await _repo.GetUser(messageForCreationDTO.RecipientId);

            if (recipient == null)
                return BadRequest("Could not found User");

            var message = _mapper.Map<Message>(messageForCreationDTO);

            _repo.Add(message);            


            if (await _repo.SaveAll())
            {
                var messegeToReturn = _mapper.Map<MessageForCreationDTO>(message);
                return CreatedAtRoute("GetMessage", new { id = message.Id }, messegeToReturn);
            }

            throw new Exception("Creating the message failed in save");

        }



    }
}
