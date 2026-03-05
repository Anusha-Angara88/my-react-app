import "./pages.css";

const Contact = () => {
  return (
    <div className="pageContainer">
      <h1>Contact Us</h1>

      <p>
        We are here to help you with your bookings and queries.
      </p>

      <h2>Get in Touch</h2>
      <ul>
        <li>Email: support@hotelbooking.com</li>
        <li>Phone: +91 98765 43210</li>
        <li>Location: Hyderabad, India</li>
      </ul>

      <h2>Customer Support</h2>
      <p>
        Our support team is available 24/7 to assist you with bookings,
        cancellations, and any issues you may face.
      </p>

      <h2>Business Enquiries</h2>
      <p>
        For partnerships or business-related queries, contact us at 
        business@hotelbooking.com.
      </p>
    </div>
  );
};

export default Contact;