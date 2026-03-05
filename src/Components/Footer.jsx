import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* LEFT */}
        <div className="footerCol">
          <h4>Prime Stay</h4>
          <p>Your trusted partner for hotels, flights, & travel experiences.</p>
        </div>

        {/* COMPANY */}
        <div className="footerCol">
          <h3>Company</h3>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/careers">Careers</Link></p>
        </div>

        {/* SUPPORT */}
        <div className="footerCol">
          <h3>Support</h3>
          <p><Link to="/contact">Contact Us</Link></p>
          <p><Link to="/cancellation">Cancellation</Link></p>
        </div>

        {/* LEGAL */}
        <div className="footerCol">
          <h3>Legal</h3>
          <p><Link to="/terms">Terms</Link></p>
          <p><Link to="/privacy">Privacy</Link></p>
        </div>

      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} Prime Stay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;