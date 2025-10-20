
import ProgressComponent from "./progress";
import { useSelector, useDispatch } from "react-redux";
import { formatted } from "../../../lib/dateFormat";
import { Separator } from "@/components/ui/separator";
import {
  prevStep,
  nextStep,
  setTotalPrice,
} from "../../../redux/slices/bookingSlice";
import { Button } from "@/components/ui/button";
import {
  HiUsers,
  HiLocationMarker,
  HiCalendar,
  HiClock,
  HiPhone,
  HiMail,
} from "react-icons/hi";

export default function StepSix() {
  const dispatch = useDispatch();

  const venue = useSelector((state) => state.booking.venue);
  const bookingDate = useSelector((state) => state.booking.bookingDate);
  const event = useSelector((state) => state.booking.guest_info);
  const contact = useSelector((state) => state.booking.contact_info);
  const pkg = useSelector((state) => state.booking.package);
  const services = useSelector((state) => state.booking.service || []);

  let startDate= null;
  if (bookingDate?.booking_date) {
    startDate = new Date(bookingDate.booking_date);
  }

  const expectedGuests = event?.expected_guest || 1;
  const venuePrice = venue?.venue_price || 0;
  const packagePrice = pkg?.package_price || 0;

  const servicesTotal = services.reduce((acc, s) => {
    if (s.serv_type === "per_person") {
      return acc + (s.serv_price || 0) * expectedGuests;
    } else {
      return acc + (s.serv_price || 0);
    }
  }, 0);

  const total = venuePrice + packagePrice + servicesTotal;

  const handleContinue = () => {
    dispatch(setTotalPrice(total));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={6} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Booking Summary</h1>
        <p className="text-gray-600 mt-1">
          Please review your booking details before proceeding to payment.
        </p>

        <div className="flex flex-row gap-4 mt-4">
          <div className="border border-gray-200 p-4 w-96 rounded-md">
            <h2 className="font-bold text-xl mb-4">Event Details</h2>

            <p className="flex items-center gap-2 text-md font-semibold mb-2">
              <HiLocationMarker className="text-xl text-gray-700" />
              {venue?.venue_name}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <HiCalendar className="text-xl text-gray-700" />
              {startDate
                ? formatted(startDate) +
                  (bookingDate?.booking_end
                    ? ` - ${formatted(new Date(bookingDate.booking_end))}`
                    : "")
                : "No date selected"}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <HiClock className="text-xl text-gray-700" />
              {bookingDate?.booking_time ?? "No time selected"}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <HiUsers className="text-xl text-gray-700" />
              {expectedGuests}
            </p>

            <p className="mb-2">
              <strong>Event Type:</strong> {event?.event_type}
            </p>
            <p>
              <strong>Event Name:</strong> {event?.event_name}
            </p>
          </div>


          <div className="border border-gray-200 p-4 w-96 rounded-md">
            <h2 className="font-bold text-xl mb-4">Contact Information</h2>

            <p className="flex items-center gap-2 mb-2">
              <HiUsers className="text-xl text-gray-700" />
              {contact?.first_name} {contact?.last_name}
            </p>

            <p className="flex items-center gap-2 mb-2">
              <HiPhone className="text-xl text-gray-700" />
              {contact?.number}
            </p>

            <p className="flex items-center gap-2">
              <HiMail className="text-xl text-gray-700" />
              {contact?.email}
            </p>
          </div>
        </div>

        {(packagePrice > 0 || services.length > 0) && (
          <div className="w-full border border-gray-200 mt-6 p-4">
            <h2 className="font-bold text-xl mb-2">Package & Services</h2>

            {pkg && (
              <>
                <div className="flex flex-row justify-between">
                  <p className="font-semibold w-full">
                    {pkg?.package_name} Package
                  </p>
                  <p className="p-1 rounded-md bg-gray-200 w-22 text-center text-xs">
                    {pkg?.package_name}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{pkg?.package_desc}</p>
              </>
            )}

            <Separator className="my-4 border-b border-gray-200" />

            <p className="flex justify-between">
              <strong>Venue Rental</strong> ₱{venuePrice.toLocaleString()}
            </p>

            {services.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Additional Services:</p>
                <ul className="list-none list-inside">
                  {services.map((s, idx) => {
                    const isPerPerson = s.serv_type === "per_person";
                    const price = isPerPerson
                      ? s.serv_price * expectedGuests
                      : s.serv_price;

                    return (
                      <li key={idx} className="flex justify-between text-sm">
                        {s.serv_name}
                        <span>
                          ₱{price?.toLocaleString() || 0}
                          {isPerPerson && (
                            <span className="text-xs text-gray-500 ml-1">
                              ({expectedGuests} guests)
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <Separator className="my-4 border border-gray-200" />
            <p className="text-lg font-bold flex justify-between">
              Total: <span>₱{total.toLocaleString()}</span>
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between px-10 pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button className="bg-black text-white" onClick={handleContinue}>
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
