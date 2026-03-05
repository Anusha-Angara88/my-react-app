import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} size="2x" />
            <span>Stay</span>
          </div>

          

        </div>
      </div>
    </div>
  );
};