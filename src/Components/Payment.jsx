import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingNow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hotel, selectedRoom } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!hotel || !selectedRoom) {
    return <h2 style={{ padding: "20px" }}>No hotel or room selected</h2>;
  }

  const totalCost = hotel.price + selectedRoom.price;

  const handleBooking = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please sign in to complete booking");
      navigate("/signin");
      return;
    }

    const newBooking = {
      userEmail: currentUser.email,
      hotelName: hotel.name,
      city: hotel.city,
      hotelPrice: hotel.price,
      roomType: selectedRoom.type,
      roomPrice: selectedRoom.price,
      totalPrice: totalCost,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    alert(`✅ Booking Successful! Total: ₹${totalCost}`);
    navigate("/profile");
  };

  return (
    <div style={styles.container}>
      <h1>Booking & Payment</h1>

      {/* Small hotel + room cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h4>{hotel.name}</h4>
          <img src={hotel.image} alt={hotel.name} style={styles.cardImage} />
          <p>City: {hotel.city}</p>
          <p>Hotel Price: ₹{hotel.price}</p>
        </div>

        <div style={styles.card}>
          <h4>{selectedRoom.type}</h4>
          <img src={selectedRoom.image} alt={selectedRoom.type} style={styles.cardImage} />
          <p>Room Price: ₹{selectedRoom.price}</p>
        </div>

        <div style={{ ...styles.card, background: "#444" }}>
          <h4>Total Cost: ₹{totalCost}</h4>
        </div>
      </div>

      {/* Payment form below cards */}
      <div style={styles.paymentBox}>
        <h3>Select Payment Method</h3>

        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Pay at Hotel
        </label>

        {paymentMethod === "card" && (
          <div style={styles.form}>
            <input type="text" placeholder="Card Number" style={styles.input} />
            <input type="text" placeholder="Expiry Date" style={styles.input} />
            <input type="text" placeholder="CVV" style={styles.input} />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div style={styles.form}>
            <input type="text" placeholder="Enter UPI ID" style={styles.input} />
          </div>
        )}

        <button style={styles.button} onClick={handleBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    color: "white",
  },
  cardsContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  card: {
    flex: "1 1 45%",
    background: "#222",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  cardImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "5px",
  },
  paymentBox: {
    background: "#333",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "12px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default BookingNow;