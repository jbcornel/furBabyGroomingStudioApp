using System;
using System.ComponentModel.DataAnnotations;

namespace FurBaby.Api.Models;

public class Appointment
{
    public int Id { get; set; }

    [Required, MaxLength(120)]
    public string OwnerName { get; set; } = string.Empty;

    [Required, MaxLength(40)]
    public string OwnerPhone { get; set; } = string.Empty;

    [MaxLength(120)]
    public string? OwnerEmail { get; set; }

    [Required, MaxLength(20)]
    public string PetType { get; set; } = string.Empty;

    [Required, MaxLength(80)]
    public string PetName { get; set; } = string.Empty;

    [MaxLength(80)]
    public string? Breed { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    [Required, MaxLength(40)]
    public string ServiceType { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Notes { get; set; }

    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}
