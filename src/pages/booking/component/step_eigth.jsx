
import ProgressComponent from "./progress";
import { useSelector, useDispatch } from "react-redux";
import { formatted } from "../../../lib/dateFormat";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resetBooking } from "../../../redux/slices/bookingSlice";
import {
  HiLocationMarker,
  HiCalendar,
  HiClock,
  HiUsers,
  HiMail,
  HiPhone,
} from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";

export default function StepEight() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = useSelector((state) => state.booking.total_price);
  const venue = useSelector((state) => state.booking.venue);
  const bookingDate = useSelector((state) => state.booking.bookingDate);
  const totalGuest = useSelector((state) => state.booking.guest_info?.expected_guest);

  const handleGoHome = () => {
    dispatch(resetBooking());
    navigate("/");
  };

  const startDate = bookingDate?.booking_date ? new Date(bookingDate.booking_date) : null;
  const endDate = bookingDate?.booking_end ? new Date(bookingDate.booking_end) : null;
  const time = bookingDate?.booking_time || "";

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={8} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-center text-2xl font-bold flex justify-center items-center gap-2 text-green-600">
          <FiCheckCircle className="text-3xl" /> Booking Confirmed!
        </h2>
        <p className="text-center text-gray-600 text-md">
          Your event reservation has been successfully processed.
        </p>

        <div className="flex flex-row gap-4 my-6">
          <div className="border border-gray-200 p-4 w-full rounded-md">
            <h2 className="text-xl font-bold mb-2">Event Details</h2>
            <p className="flex items-center gap-2">
              <HiLocationMarker className="text-lg text-gray-700" />
              {venue?.venue_name}
            </p>
            <p className="ml-6 text-sm text-gray-500">{venue?.venue_loc}</p>
            <p className="flex items-center gap-2 mt-2">
              <HiCalendar className="text-lg text-gray-700" />
              {startDate ? formatted(startDate) : "No date selected"}
              {endDate && endDate.getTime() !== startDate?.getTime()
                ? ` - ${formatted(endDate)}`
                : ""}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <HiClock className="text-lg text-gray-700" />
              {time || "No time selected"}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <HiUsers className="text-lg text-gray-700" />
              {totalGuest ?? "N/A"} guests
            </p>
          </div>

          <div className="border border-gray-200 p-4 w-full rounded-md">
            <h2 className="text-xl font-bold mb-2">Payment Summary</h2>
            <p className="flex items-center gap-2 text-lg font-medium">
              <FiCheckCircle className="text-green-600" />
              Total amount paid: ₱{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="border border-gray-200 p-4 rounded-md mt-6">
          <h2 className="text-xl font-bold">What Happens Next?</h2>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <HiMail className="text-lg text-gray-600" />
                Confirmation Email
              </h3>
              <p className="text-sm text-gray-600 ml-6">
                You’ll receive a detailed confirmation email within 5 minutes.
              </p>
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <HiPhone className="text-lg text-gray-600" />
                Event Coordinator Contact
              </h3>
              <p className="text-sm text-gray-600 ml-6">
                Our coordinator will call you within 24 hours to finalize details.
              </p>
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <HiCalendar className="text-lg text-gray-600" />
                Final Planning
              </h3>
              <p className="text-sm text-gray-600 ml-6">
                We’ll coordinate final plans 2 weeks before your event.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 p-4 rounded-md mt-6">
          <h2 className="text-xl font-bold mb-2">Need Help?</h2>
          <div className="flex flex-row gap-4">
            <div className="w-full border border-gray-200 p-4 rounded-md flex items-center gap-2">
              <HiPhone className="text-xl text-gray-600" />
              <div>
                <h2 className="font-medium">Call Us</h2>
                <p className="text-sm">093282345</p>
              </div>
            </div>
            <div className="w-full border border-gray-200 p-4 rounded-md flex items-center gap-2">
              <HiMail className="text-xl text-gray-600" />
              <div>
                <h2 className="font-medium">Email Us</h2>
                <p className="text-sm">events@elegantevents.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="bg-black text-white" onClick={handleGoHome}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
