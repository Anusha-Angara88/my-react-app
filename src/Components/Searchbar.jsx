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
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

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

        {/* Date */}
        <div className="searchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="searchIcon" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="searchText"
          >
            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </span>

          {openDate && (
            <DateRange
              editableDateInputs
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
            />
          )}
        </div>

        {/* Options */}
        <div className="searchItem">
          <FontAwesomeIcon icon={faPerson} className="searchIcon" />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="searchText"
          >
            {`${options.adult} adult · ${options.children} children · ${options.room} room`}
          </span>

          {openOptions && (
            <div className="options">

              {/* Adult */}
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.adult}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Room */}
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.room}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          )}
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