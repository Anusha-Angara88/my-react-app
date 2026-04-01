import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hotels.css";

function Hotels() {

  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const hotelsPerPage = 3;

  useEffect(() => {

    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => setHotels(data));

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);

  }, []);

  const toggleWishlist = (e, hotel) => {

    e.preventDefault();
    e.stopPropagation();

    let updatedWishlist;

    const isAlreadyLiked = wishlist.find(
      (item) => item.id === hotel.id
    );

    if (isAlreadyLiked) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== hotel.id
      );
    } else {
      updatedWishlist = [...wishlist, hotel];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handlePageChange = (pageNumber) => {

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  return (
    <div className="hotels-container">

      <h2 className="hotels-title">Hotels List</h2>

      <div className="hotels-grid">

        {currentHotels.map((hotel) => {

          const isFavorite = wishlist.find(
            (item) => item.id === hotel.id
          );

          return (

            <Link
              to={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="hotel-card"
              style={{ position: "relative" }}
            >

              {/* ❤️ Like Icon */}
              <div
                onClick={(e) => toggleWishlist(e, hotel)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              >
                {isFavorite ? "❤️" : "🤍"}
              </div>

              <img
                src={hotel.image}
                alt={hotel.name}
                className="hotel-image"
              />

              <h3 className="hotel-title">{hotel.name}</h3>

            </Link>

          );

        })}

      </div>

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              className={currentPage === index + 1 ? "activePage" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}

export default Hotels;