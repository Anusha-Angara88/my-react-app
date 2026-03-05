import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import "./hotelsList.css";

const HotelList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.destination || "";
  const date = location.state?.date || [];
  const options = location.state?.options || {};

  const hotels = [
    { id: 1, name: "Grand Palace Hotel" },
    { id: 2, name: "Sea View Resort" },
    { id: 3, name: "Mountain Lodge" },
    { id: 4, name: "Royal Heritage Hotel" },
    { id: 5, name: "City Lights Inn" },
    { id: 6, name: "Desert Pearl Hotel" },
    { id: 7, name: "Sunset Paradise Resort" },
    { id: 8, name: "Snow Peak Resort" },
    { id: 9, name: "Golden Sands Hotel" },
    { id: 10, name: "Imperial Suites" },
    { id: 11, name: "Lakeview Retreat" },
    { id: 12, name: "Urban Stay Hotel" },
    { id: 13, name: "Ocean Breeze Resort" },
    { id: 14, name: "Historic Plaza Hotel" },
    { id: 15, name: "Palm Tree Resort" },
  ];

  const filteredHotels = destination
    ? hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(destination.toLowerCase())
      )
    : hotels;

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 3;

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div className="hotelListContainer">

      {/* SEARCH DETAILS */}
      <div className="searchSummary">
        <h2>Search Results</h2>

        <p><strong>Destination:</strong> {destination || "All Hotels"}</p>

        {date.length > 0 && (
          <p>
            <strong>Dates:</strong>{" "}
            {format(date[0].startDate, "dd/MM/yyyy")} →
            {format(date[0].endDate, "dd/MM/yyyy")}
          </p>
        )}

        <p>
          <strong>Guests:</strong>{" "}
          {options.adult || 1} Adult • {options.children || 0} Children •{" "}
          {options.room || 1} Room
        </p>
      </div>

      {/* HOTEL CARDS */}
      {currentHotels.map((hotel) => (
        <div className="hotelCard" key={hotel.id}>

          <img
            src={`https://picsum.photos/400/250?random=${hotel.id}`}
            alt={hotel.name}
            className="hotelImg"
          />

          <div className="hotelInfo">
            <h3>{hotel.name}</h3>
            <p>Free WiFi • Breakfast/ Lunnch/ Dinner  included</p>
            <p className="price">₹{10000 + hotel.id * 200} per Day</p>

            <button
              className="viewBtn"
              onClick={() =>
                navigate(`/hotels/${hotel.id}`, { state: hotel })
              }
            >
              View Availability
            </button>
          </div>

        </div>
      ))}

      {/* PAGINATION */}
      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>Page {currentPage} / {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default HotelList;