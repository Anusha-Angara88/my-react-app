import { useEffect, useState } from "react";
import "./bookflights.css";

const Booking = () => {

  const [flight, setFlight] = useState(null);

  useEffect(() => {

    try {
      const bookedFlights = JSON.parse(localStorage.getItem("bookedFlights"));

      if (bookedFlights && bookedFlights.length > 0) {
        setFlight(bookedFlights[bookedFlights.length - 1]);
      }

    } catch (error) {
      console.log("LocalStorage error", error);
    }

  }, []);

  const handleConfirm = () => {
    alert("Flight booking confirmed!");
    window.location.href = "/profile";
  };

  if (!flight) {
    return (
      <div style={{textAlign:"center",padding:"40px"}}>
        <h2>No booking found</h2>
      </div>
    );
  }

  return (
    <div className="bookingContainer">

      <h2>Flight Booking</h2>

      <div className="ticketCard">

        <h3>{flight.airline}</h3>

        <p className="route">
          {flight.from} ➝ {flight.to}
        </p>

        <div className="timeRow">

          <div>
            <h2>{flight.departure}</h2>
            <p>Departure</p>
          </div>

          <div>
            <p>{flight.duration}</p>
            <p>{flight.stops}</p>
          </div>

          <div>
            <h2>{flight.arrival}</h2>
            <p>Arrival</p>
          </div>

        </div>

        <p className="price">Price: ₹{flight.price}</p>

        <p className="rating">⭐ {flight.rating}</p>

        <button className="confirmBtn" onClick={handleConfirm}>
          Confirm Booking
        </button>

      </div>

    </div>
  );
};

export default Booking;