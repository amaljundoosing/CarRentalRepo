using Microsoft.AspNetCore.Mvc;
using VehicleBookingApi.Data;
using VehicleBookingApi.Models;

namespace VehicleBookingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetVehicles()
        {
            return Ok(VehicleRepository.Vehicles);
        }

        [HttpPost("calculate")]
        public IActionResult CalculateBooking([FromBody] BookingRequest request)
        {
            var vehicle = VehicleRepository.Vehicles
                .FirstOrDefault(v => v.Id == request.VehicleId);

            if (vehicle == null || !vehicle.IsAvailable)
                return BadRequest("Vehicle not available");

            var days = (request.EndDate - request.StartDate).Days;

            if (days <= 0)
                return BadRequest("Invalid dates");

            var total = days * vehicle.RatePerDay;

            return Ok(new { total });
        }
        [HttpPost("book")]
        public IActionResult BookVehicle([FromBody] BookingRequest request)
        {
            var vehicle = VehicleRepository.Vehicles
                .FirstOrDefault(v => v.Id == request.VehicleId);

            if (vehicle == null || !vehicle.IsAvailable)
                return BadRequest("Vehicle not available");

            var days = (request.EndDate - request.StartDate).Days;

            if (days <= 0)
                return BadRequest("Invalid dates");

            var total = days * vehicle.RatePerDay;

            var booking = new Booking
            {
                Id = BookingRepository.Bookings.Count + 1,
                VehicleId = vehicle.Id,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Total = total
            };

            BookingRepository.Bookings.Add(booking);

            // OPTIONAL: mark vehicle unavailable after booking
            vehicle.IsAvailable = false;

            return Ok(booking);
        }
    }
}