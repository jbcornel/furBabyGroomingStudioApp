using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurBaby.Api.Models;
using FurBaby.Api.Data;

namespace FurBaby.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AppointmentsController(AppDbContext db)
    {
        _db = db;
    }

    public record CreateAppointmentRequest(
        string OwnerName,
        string OwnerEmail,
        string OwnerPhone,
        string PetName,
        string PetType,
        string Service,
        DateTime RequestedDate,
        string? Notes
    );

    public record AppointmentResponse(
        int Id,
        string OwnerName,
        string OwnerEmail,
        string OwnerPhone,
        string PetName,
        string PetType,
        string Service,
        DateTime RequestedDate,
        string Status
    );

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentResponse>>> Get()
    {
        var items = await _db.Appointments
            .AsNoTracking()
            .OrderByDescending(a => a.Id)
            .Select(a => new AppointmentResponse(
    a.Id,
    a.OwnerName,
    a.OwnerEmail,
    a.OwnerPhone,
    a.PetName,
    a.PetType,
    a.ServiceType,
    a.StartTime,
    "Requested"
))

            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppointmentResponse>> GetById(int id)
    {
        var a = await _db.Appointments
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (a is null) return NotFound();

        var dto = new AppointmentResponse(
            Id: a.Id,
            OwnerName: a.OwnerName,
            OwnerEmail: a.OwnerEmail,
            OwnerPhone: a.OwnerPhone,
            PetName: a.PetName,
            PetType: a.PetType,
            Service: a.ServiceType,
            RequestedDate: a.StartTime,
            Status: "Requested"
        );

        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<AppointmentResponse>> Create([FromBody] CreateAppointmentRequest req)
    {
        // Minimal validation for tracer-bullet
        if (string.IsNullOrWhiteSpace(req.OwnerName)) return BadRequest(new { message = "OwnerName is required" });
        if (string.IsNullOrWhiteSpace(req.OwnerEmail)) return BadRequest(new { message = "OwnerEmail is required" });
        if (string.IsNullOrWhiteSpace(req.OwnerPhone)) return BadRequest(new { message = "OwnerPhone is required" });
        if (string.IsNullOrWhiteSpace(req.PetName)) return BadRequest(new { message = "PetName is required" });
        if (string.IsNullOrWhiteSpace(req.PetType)) return BadRequest(new { message = "PetType is required" });
        if (string.IsNullOrWhiteSpace(req.Service)) return BadRequest(new { message = "Service is required" });

        var entity = new Appointment
        {
            OwnerName = req.OwnerName.Trim(),
            OwnerEmail = req.OwnerEmail.Trim(),
            OwnerPhone = req.OwnerPhone.Trim(),
            PetName = req.PetName.Trim(),
            PetType = req.PetType.Trim(),
            ServiceType = req.Service.Trim(),
            StartTime = req.RequestedDate,
            Notes = string.IsNullOrWhiteSpace(req.Notes) ? null : req.Notes.Trim(),
            CreatedUtc = DateTime.UtcNow
        };

        _db.Appointments.Add(entity);
        await _db.SaveChangesAsync();

        var dto = new AppointmentResponse(
            Id: entity.Id,
            OwnerName: entity.OwnerName,
            OwnerEmail: entity.OwnerEmail,
            OwnerPhone: entity.OwnerPhone,
            PetName: entity.PetName,
            PetType: entity.PetType,
            Service: entity.ServiceType,
            RequestedDate: entity.StartTime,
            Status: "Requested"
        );

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, dto);
    }
}
