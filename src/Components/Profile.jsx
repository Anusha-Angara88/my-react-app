import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    setUser(currentUser);

    if (currentUser) {
      const userBookings = allBookings.filter(
        (b) => b.userEmail === currentUser.email
      );
      setBookings(userBookings);
    }
  }, []);

  const handleCancel = (id) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = allBookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  if (!user) {
    return (
      <div
        style={{
          color: "white",
          padding: "100px",
          textAlign: "center",
        }}
      >
        <h2>No User Logged In</h2>
        <button
          onClick={() => navigate("/signin")}
          style={{
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Go to Signin
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h2
        style={{
          borderBottom: "1px solid #444",
          paddingBottom: "10px",
        }}
      >
        My Profile
      </h2>

      {/* USER DETAILS */}
      <div
        style={{
          background: "#333",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px 0",
        }}
      >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>

      {/* ❤️ WISHLIST SECTION */}
      <h3 style={{ marginTop: "20px" }}>❤️ My Wishlist</h3>

      {wishlist.length === 0 ? (
        <p>No favorite hotels added.</p>
      ) : (
        wishlist.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              background: "#856f6f",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              borderLeft: "5px solid pink",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {/* IMAGE */}
            <img
              src={hotel.image}
              alt={hotel.name}
              width="100"
              style={{ borderRadius: "8px" }}
            />

            {/* DETAILS */}
            <div>
              <h4>{hotel.name}</h4>
              <p>City: {hotel.city}</p>
              <p>Price: ₹{hotel.price}</p>
            </div>
          </div>
        ))
      )}

      {/* BOOKINGS */}
      <h3>My Booking History ({bookings.length})</h3>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              background: "#222",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              borderLeft: "5px solid green",
            }}
          >
            <h4>{booking.hotelName}</h4>
            <p>City: {booking.city}</p>
            <p>Room Type: {booking.roomType}</p>
            <p>Room Price: ₹{booking.roomPrice}</p>
            <p>
              Adults: {booking.adults} | Children: {booking.children} | Rooms: {booking.rooms}
            </p>
            <p style={{ fontWeight: "bold" }}>
              Total Paid: ₹{booking.totalPrice}
            </p>

            <button
              onClick={() => handleCancel(booking.id)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: "#aaa" }}>
          No bookings found yet.
        </p>
      )}
    </div>
  );
}

export default Profile;