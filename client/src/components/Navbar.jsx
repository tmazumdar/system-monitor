import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img className="h-10 inline" src="src/assets/raspberry-pi.png"></img>
        </NavLink>
      </nav>
    </div>
  );
}