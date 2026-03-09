import React, { useState } from "react";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Searchbar = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
 
  
  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
    }));
  };

  const handleSearch = async () => {
    if (!destination.trim()) {
      alert("Please enter a hotel name");
      return;
    }

    // Fetch hotels data
    const res = await fetch("/hotels.json");
    const data = await res.json();

    // Find hotel by name (case insensitive)
    const matchedHotel = data.find((hotel) =>
      hotel.name.toLowerCase().includes(destination.toLowerCase())
    );

    if (!matchedHotel) {
      alert("Hotel not found!");
      return;
    }

    // Navigate directly to HotelDetails page
    navigate(`/hotels/${matchedHotel.id}`, {
      state: {
        date,
        options,
      },
    });
  };

  return (
    <div className="search">
      <div className="searchContainer">

        {/* Destination */}
        <div className="searchItem">
          <FontAwesomeIcon icon={faBed} className="searchIcon" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="searchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        

        {/* Search Button */}
        <div className="searchItem">
          <button className="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>

      </div>
    </div>
  );
};

export default Searchbar;