import "./pages.css";

const Terms = () => {
  return (
    <div className="pageContainer">
      <h1>Terms & Conditions</h1>

      <p>
        By using Prime Stay, you agree to the following terms and conditions.
      </p>

      <h2>Booking Policy</h2>
      <ul>
        <li>All bookings are subject to availability.</li>
        <li>Prices may change without notice.</li>
        <li>Valid ID proof is required during check-in.</li>
      </ul>

      <h2>User Responsibilities</h2>
      <ul>
        <li>Provide accurate information while booking.</li>
        <li>Follow hotel rules and regulations.</li>
      </ul>

      <h2>Payments</h2>
      <p>
        All payments must be completed before confirmation. We use secure payment
        gateways to protect your transactions.
      </p>
    </div>
  );
};

export default Terms;