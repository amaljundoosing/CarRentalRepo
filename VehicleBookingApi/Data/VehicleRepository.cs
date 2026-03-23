using VehicleBookingApi.Models;

namespace VehicleBookingApi.Data
{
    public static class VehicleRepository
    {
        public static List<Vehicle> Vehicles = new List<Vehicle>
        {
            new Vehicle { Id = 1, Type = "Car", Color = "Red", RatePerDay = 500, IsAvailable = true },
            new Vehicle { Id = 2, Type = "Van", Color = "Black", RatePerDay = 1000, IsAvailable = false },
            new Vehicle { Id = 3, Type = "Truck", Color = "Blue", RatePerDay = 1500, IsAvailable = true }
        };
    }
}