import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="MongoDB logo" className="h-10 inline" src="https://static-00.iconduck.com/assets.00/raspberry-pi-icon-2048x2048-p0y4r07x.png"></img>
        </NavLink>
      </nav>
    </div>
  );
}