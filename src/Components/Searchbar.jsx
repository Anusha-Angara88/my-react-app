import React, { useState } from "react";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSearch = async () => {
    if (!destination.trim()) {
      alert("Please enter a hotel name");
      return;
    }

    try {
      const res = await fetch("/hotels.json");
      const data = await res.json();

      const matchedHotel = data.find((hotel) =>
        hotel.name.toLowerCase().includes(destination.toLowerCase())
      );

      if (!matchedHotel) {
        alert("Hotel not found!");
        return;
      }

      navigate(`/hotels/${matchedHotel.id}`);

    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
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