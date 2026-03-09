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

  const [hoveredRoom, setHoveredRoom] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedHotel = data.find(
          (item) => item.id === parseInt(id)
        );
        setHotel(selectedHotel);
        setReviews(selectedHotel.reviews || []);
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
    if (!selectedRoom || !checkIn || !checkOut || totalDays <= 0) {
      alert("Please select room, valid dates and details before booking!");
      return;
    }

    if (selectedRoom.available < roomsCount) {
      alert("Not enough rooms available!");
      return;
    }

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

  // Check if user already reviewed
  const userReviewIndex = reviews.findIndex(
    (r) => r.email === currentUser?.email
  );

  const handleReviewSubmit = () => {
    if (!reviewRating || !reviewComment) {
      alert("Fill all fields");
      return;
    }

    const newReview = {
      user: currentUser.name,
      email: currentUser.email,
      rating: reviewRating,
      comment: reviewComment,
    };

    if (editingIndex !== null) {
      const updated = [...reviews];
      updated[editingIndex] = newReview;
      setReviews(updated);
      setEditingIndex(null);
    } else {
      if (userReviewIndex !== -1) {
        alert("You already submitted a review.");
        return;
      }
      setReviews([...reviews, newReview]);
    }

    setReviewRating("");
    setReviewComment("");
  };

  const handleEdit = (index) => {
    const r = reviews[index];
    setReviewRating(r.rating);
    setReviewComment(r.comment);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
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
              }}
              disabled={selectedRoom && selectedRoom.available === 0}
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
                  transform:
                    hoveredRoom === index ? "scale(1.05)" : "scale(1)",
                  border:
                    selectedRoom?.type === room.type
                      ? "2px solid green"
                      : "1px solid #eee",
                  opacity: room.available === 0 ? 0.5 : 1,
                }}
                onMouseEnter={() => setHoveredRoom(index)}
                onMouseLeave={() => setHoveredRoom(null)}
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

          {/* Reviews */}
          <h3 style={{ marginTop: "15px" }}>Reviews</h3>

          {reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <strong>{review.user}</strong>
              <p>⭐ {review.rating}</p>
              <p>{review.comment}</p>

              {review.email === currentUser?.email && (
                <>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </div>
          ))}

          {userReviewIndex === -1 || editingIndex !== null ? (
            <>
              <h3>Add Review</h3>

              <input
                placeholder="Rating"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                style={styles.inputBox}
              />

              <textarea
                placeholder="Comment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                style={{ width: "100%", marginTop: "5px" }}
              />

              <button
                onClick={handleReviewSubmit}
                style={{ marginTop: "5px" }}
              >
                {editingIndex !== null ? "Update Review" : "Add Review"}
              </button>
            </>
          ) : (
            <p style={{ marginTop: "10px" }}>
              You already submitted a review.
            </p>
          )}
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
  maxWidth: "1400px",   // change 1000px → 1400px
  width: "100%",
  flexWrap: "wrap",
},
  hotelSection: {
  flex: "1.3",          // change from 1
  minWidth: "420px",    // change 300 → 420
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
},
  roomsSection: {
  flex: "1",            // keep smaller than left
  minWidth: "420px",    // change 300 → 420
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
},
 image: {
  width: "100%",
  height: "250px",   // 200 → 250
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "20px",
},
  roomsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
  },
  roomCard: {
    borderRadius: "8px",
    padding: "6px",
    textAlign: "center",
    fontSize: "13px",
  },
  roomImage: {
    width: "100%",
    height: "90px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  reviewCard: {
    borderBottom: "1px solid #eee",
    padding: "8px 0",
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
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
  },
  inputBox: {
    padding: "4px",
    margin: "4px",
  },
  inputBox: {
    padding: "4px",
    margin: "4px",
  },
  
};

export default HotelDetails;