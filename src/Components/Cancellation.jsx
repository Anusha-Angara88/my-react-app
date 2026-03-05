import "./pages.css";

const Cancellation = () => {
  return (
    <div className="pageContainer">
      <h1>Cancellation Policy</h1>

      <p>
        We understand that plans change. Our cancellation policy is designed to
        be flexible.
      </p>

      <h2>Free Cancellation</h2>
      <p>
        Cancel your booking up to 24 hours before check-in to receive a full refund.
      </p>

      <h2>Late Cancellation</h2>
      <p>
        Cancellations made within 24 hours may incur a partial charge.
      </p>

      <h2>No Show</h2>
      <p>
        If you do not check in, the full booking amount may be charged.
      </p>
    </div>
  );
};

export default Cancellation;