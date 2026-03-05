import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  

  const isFavorite = wishlist.find(
    (item) => item.id === hotel.id
  );

  return (
    <div>
      <img
        src={hotel.thumbnail}
        alt={hotel.title}
        width="250"
        style={{ borderRadius: "8px" }}
      />

      <h3>{hotel.title}</h3>
      <p>Price: ₹{hotel.price}</p>
      <p>⭐ Rating: {hotel.rating}</p>
    </div>
  );
};

export default HotelCard;