import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Hotels.css";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedHotel = data.find(
          (item) => item.id === parseInt(id)
        );
        setHotel(selectedHotel);
      });
  }, [id]);

  if (!hotel) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const diffTime = outDate - inDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();

  const totalPrice =
    selectedRoom && totalDays > 0
      ? selectedRoom.price * roomsCount * totalDays
      : 0;

  const handleBooking = () => {
    if (
      !selectedRoom ||
      !checkIn ||
      !checkOut ||
      totalDays <= 0
    ) {
      alert("Please select room, valid dates and details before booking!");
      return;
    }

    if (selectedRoom.available < roomsCount) {
      alert("Not enough rooms available!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please login first!");
      navigate("/signin");
      return;
    }

    const booking = {
      id: Date.now(),
      hotelName: hotel.name,
      city: hotel.city,
      checkIn,
      checkOut,
      days: totalDays,
      roomType: selectedRoom.type,
      roomPrice: selectedRoom.price,
      adults,
      children,
      rooms: roomsCount,
      totalPrice,
      userEmail: currentUser.email,
    };

    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    allBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    // 🔥 Reduce Available Rooms
    const updatedHotel = { ...hotel };
    updatedHotel.rooms = updatedHotel.rooms.map((room) =>
      room.type === selectedRoom.type
        ? { ...room, available: room.available - roomsCount }
        : room
    );

    setHotel(updatedHotel);
    setSelectedRoom(null);

    navigate("/profile");
  };

  return (
    <div style={styles.pageContent}>
      <div style={styles.mainContainer}>

        {/* LEFT SIDE */}
        <div style={styles.hotelSection}>
          <h2>{hotel.name}</h2>

          <img src={hotel.image} alt={hotel.name} style={styles.image} />

          <p><strong>City:</strong> {hotel.city}</p>
          <p><strong>Info:</strong>{hotel.description}</p>
          <p><strong>Food:</strong>{hotel.food}</p>
          <p><strong>Internet:</strong>{hotel.internet}</p>
          <h3>₹{hotel.price} / Full Day</h3>
          <p>⭐ {hotel.rating}</p>

          <div style={styles.selectionRow}>
            <div>
              <label>Check-In:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={styles.inputBox}
              />
            </div>

            <div>
              <label>Check-Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={styles.inputBox}
              />
            </div>
          </div>

          <div style={styles.selectionRow}>
            <div>
              <label>Adults:</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                style={styles.inputBox}
              />
            </div>

            <div>
              <label>Children:</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                style={styles.inputBox}
              />
            </div>

            <div>
              <label>Rooms:</label>
              <input
                type="number"
                min="1"
                value={roomsCount}
                onChange={(e) => setRoomsCount(parseInt(e.target.value))}
                style={styles.inputBox}
              />
            </div>
          </div>

          <div style={styles.actionRow}>
            <button
              style={{
                ...styles.bookBtn,
                background:
                  selectedRoom && selectedRoom.available === 0
                    ? "gray"
                    : "green",
                cursor:
                  selectedRoom && selectedRoom.available === 0
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                selectedRoom && selectedRoom.available === 0
              }
              onClick={handleBooking}
            >
              {selectedRoom && selectedRoom.available === 0
                ? "Sold Out"
                : `Book Now (₹${totalPrice})`}
            </button>

            <Link to="/">
              <button style={styles.homeBtn}>Home</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.roomsSection}>
          <h3>Rooms</h3>

          <div style={styles.roomsContainer}>
            {hotel.rooms?.map((room, index) => (
              <div
                key={index}
                style={{
                  ...styles.roomCard,
                  border: selectedRoom?.type === room.type
                    ? "2px solid green"
                    : "1px solid #eee",
                  opacity: room.available === 0 ? 0.5 : 1,
                  cursor: room.available === 0 ? "not-allowed" : "pointer",
                }}
                onClick={() =>
                  room.available > 0 && setSelectedRoom(room)
                }
              >
                <img
                  src={room.image}
                  alt={room.type}
                  style={styles.roomImage}
                />
                <h4>{room.type}</h4>
                <p>₹{room.price}</p>
                <p>
                  {room.available > 0
                    ? `Available: ${room.available}`
                    : "Sold Out"}
                </p>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "15px" }}>Reviews</h3>
          {hotel.reviews?.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <strong>{review.user}</strong>
              <p>⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const styles = {
  pageContent: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  mainContainer: {
    display: "flex",
    gap: "20px",
    maxWidth: "1000px",
    width: "100%",
    flexWrap: "wrap",
  },
  hotelSection: {
    flex: 1,
    minWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
  },
  roomsSection: {
    flex: 1,
    minWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  roomsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "15px",
  },
  roomCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "8px",
    textAlign: "center",
  },
  roomImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "5px",
  },
  reviewCard: {
    borderBottom: "1px solid #eee",
    padding: "8px 0",
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },
  bookBtn: {
    padding: "8px 12px",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  homeBtn: {
    padding: "8px 12px",
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  selectionRow: {
    display: "flex",
    gap: "10px",
    margin: "10px 0",
    flexWrap: "wrap",
  },
  inputBox: {
    width: "120px",
    marginLeft: "5px",
    padding: "3px 6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default HotelDetails;