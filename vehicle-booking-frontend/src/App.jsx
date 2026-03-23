import { useEffect, useState } from "react";
import { useVehicleContext } from "./context/VehicleContext";
import "./style/style.css"

function App() {
  const { state, dispatch } = useVehicleContext();
  const { vehicles, selectedVehicle, total } = state;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5017/api/vehicles")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "SET_VEHICLES", payload: data });
      })
      .catch(err => console.error(err));
  }, []);

  const calculate = () => {
  if (!startDate || !endDate) {
    setError("Please select both start and end dates!");
    return;
  }
   if (new Date(startDate) > new Date(endDate)) {
    setError("Start date cannot be after End date!");
    return;
  }
    setError(""); // Clear error if everything is fine

 fetch("http://localhost:5017/api/vehicles/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vehicleId: selectedVehicle.id,
      startDate,
      endDate
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: "SET_TOTAL", payload: data.total });
    });
};

const bookVehicle = () => {
if (!startDate || !endDate) {
    setError("Please select both start and end dates!");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    setError("Start date cannot be after End date!");
    return;
  }

fetch("http://localhost:5017/api/vehicles/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vehicleId: selectedVehicle.id,
      startDate,
      endDate
    })
  })
    .then(res => res.json())
    .then(data => {
      setBooking(data);

      dispatch({
        type: "SET_VEHICLES",
        payload: vehicles.map(v =>
          v.id === selectedVehicle.id
            ? { ...v, isAvailable: false }
            : v
        )
      });
      dispatch({ type: "SELECT_VEHICLE", payload: null });
      dispatch({ type: "SET_TOTAL", payload: null });
    });
};

  return (
    <div className="booking-wrapper">
      <h1>Vehicle Booking</h1>

      <h2>Available Vehicles</h2>

      {vehicles.map(v => (
        <ul key={v.id} className="vehicle-list">
          <li
            className={v.isAvailable ? "active" : "disable"}
            onClick={() => {
              if (!v.isAvailable) return;
              dispatch({ type: "SELECT_VEHICLE", payload: v });
            }}
          >
            {v.type} | {v.color} | ${v.ratePerDay}/day
            {!v.isAvailable && " (Unavailable)"}
          </li>
        </ul>
      ))}

      {selectedVehicle && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected: {selectedVehicle.type}</h3>

          <div className="date-container">
            <div className="date-group">
              <label>Start Date</label>
              <input
                type="date"
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="date-group">
              <label>End Date</label>
              <input
                type="date"
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button onClick={calculate} className="button-cal" disabled={!startDate || !endDate}>
            Calculate Price
          </button>

          {total && <h2>Total: ${total}</h2>}
          {total && (
            <button
              onClick={bookVehicle}
              disabled={!startDate || !endDate}
              className="button"
            >
              Book Vehicle
            </button>
          )}
        </div>
      )}
      {booking && (
        <div className="booking-wrapper" >
          <h2>Booking Confirmed </h2>
          <p>Vehicle ID: {booking.vehicleId}</p>
          <p>Total Paid: ${booking.total}</p>
        </div>
      )}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default App;