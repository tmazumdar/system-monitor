import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import ProcessCard from "./components/ProcessCard";
import './App.css'

function App() {

  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
      <Stats />
      <ProcessCard />
    </div>
  )
}

export default App
