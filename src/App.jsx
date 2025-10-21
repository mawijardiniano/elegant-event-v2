import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/home";
import Venue from "./pages/venue/venue";
import Admin from "./admin/auth/auth";
import Dashboard from "./admin/dashboard/dashboard";
import Booking from "./pages/booking/booking";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/protectedRoute";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/venue" element={<Venue />} />

        <Route
          path="/booking"
          element={
            <Elements stripe={stripePromise}>
              <Booking />
            </Elements>
          }
        />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
