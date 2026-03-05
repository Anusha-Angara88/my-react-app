import "./pages.css";

const Privacy = () => {
  return (
    <div className="pageContainer">
      <h1>Privacy Policy</h1>

      <p>
        Your privacy is important to us. This policy explains how we collect and use your data.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Name and contact details</li>
        <li>Booking information</li>
        <li>Payment details (securely processed)</li>
      </ul>

      <h2>How We Use Data</h2>
      <ul>
        <li>To process bookings</li>
        <li>To improve our services</li>
        <li>To provide customer support</li>
      </ul>

      <h2>Security</h2>
      <p>
        We use industry-standard security measures to protect your data.
      </p>
    </div>
  );
};

export default Privacy;