namespace VehicleBookingApi.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Color { get; set; }
        public decimal RatePerDay { get; set; }
        public bool IsAvailable { get; set; }
    }
}