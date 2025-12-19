import { NavLink } from "react-router-dom";
import rpiLogo from "../assets/raspberry-pi.png";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img className="h-10 inline" src={rpiLogo}></img>
        </NavLink>
        <p>Referred from: <b>{document.referrer || "Direct visit"}</b></p>
      </nav>
    </div>
  );
}