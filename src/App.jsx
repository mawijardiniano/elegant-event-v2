import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/home";
import Venue from "./pages/venue/venue";
import Booking from "./pages/booking/booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
