import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHotel, faPlane, faCar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../Searchbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <div className="navbar">

      {/* TOP BAR */}
      <div className="navTop">

        <span className="logo" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHotel} />
          PRIME STAY
        </span>
        

        {/* PROFILE */}
        <div className="profileWrapper">
          <div
            className="profileCircle"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>

          {openDropdown && (
            <div className="profileDropdown">
              <div onClick={() => navigate("/profile")}>My Profile</div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>

      </div>

      {/* SEARCHBAR */}
      <div className="searchWrapper">
        <Searchbar />
      </div>

      {/* STAYS BUTTON */}
      <div className="navBottom">
  <div
    className="navItem active"
    onClick={() => navigate("/hotels")}
    style={{ cursor: "pointer" }}
  >
    <FontAwesomeIcon icon={faHotel} /> 
    <span>Stays</span>
  </div>



  <div
    className="navItem active"
    onClick={() => navigate("/flights")}
    style={{ cursor: "pointer" }}
  >
    <FontAwesomeIcon icon={faPlane} /> 
    <span>Flight</span>
  </div>



  
</div>
      <h1 className="headerTitle">Everything You Need for Your Trip</h1>
      <h3 className="headerDesc">
        Plan your journey effortlessly with Prime Stay.
      </h3>

    </div>
  );
};

export default Navbar;