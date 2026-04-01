import { useState, useEffect } from "react";
import "./flights.css";

const Flights = () => {

  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    fetch("/flights.json")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {

    if (from === "" || to === "") {
      alert("Please select From and To locations");
      return;
    }

    const results = flights.filter(
      (flight) =>
        flight.from.toLowerCase() === from.toLowerCase() &&
        flight.to.toLowerCase() === to.toLowerCase()
    );

    setFilteredFlights(results);
  };

  // BOOK FLIGHT FUNCTION
  const handleBook = (flight) => {

    let bookedFlights =
      JSON.parse(localStorage.getItem("bookedFlights")) || [];

    bookedFlights.push(flight);

    localStorage.setItem("bookedFlights", JSON.stringify(bookedFlights));

    // redirect to booking page
   window.location.href = "/bookflights";
  };

  return (
    <div className="flightsContainer">

      <h2 className="flightTitle">Search Flights</h2>

      <div className="flightSearch">

        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">From</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Bengaluru</option>
          <option>Chennai</option>
        </select>

        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">To</option>
          <option>Dubai</option>
          <option>London</option>
          <option>Paris</option>
          <option>New York</option>
          <option>Tokyo</option>
          <option>Maldives</option>
          <option>Switzerland</option>
          <option>Canada</option>
        </select>

        <button onClick={handleSearch}>Search</button>

      </div>

      <div className="flightCards">

        {filteredFlights.length === 0 ? (
          <p className="noFlights">No flights found</p>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flightCard">

              <div className="airlineRow">
                <h3>{flight.airline}</h3>
                <span className="rating">⭐ {flight.rating}</span>
              </div>

              <div className="timeRow">

                <div className="timeBlock">
                  <h2>{flight.departure}</h2>
                  <p>{flight.from}</p>
                </div>

                <div className="durationBlock">
                  <p className="duration">{flight.duration}</p>
                  <p className="stops">{flight.stops}</p>
                </div>

                <div className="timeBlock">
                  <h2>{flight.arrival}</h2>
                  <p>{flight.to}</p>
                </div>

                <div className="priceBlock">
                  <h3>₹{flight.price}</h3>

                  <button
                    className="bookBtn"
                    onClick={() => handleBook(flight)}
                  >
                    Book Flight
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Flights;