import React, { useEffect, useState } from "react";
import "./Hotels.css";

function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div className="hotels-container">
      <h2 className="hotels-title">Hotels List</h2>

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="hotel-image"
            />

            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="hotel-city">{hotel.city}</p>
              <p className="hotel-description">{hotel.description}</p>

              <div className="hotel-details">
                <span className="hotel-price">${hotel.price} / night</span>
                <span className="hotel-rating">⭐ {hotel.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;