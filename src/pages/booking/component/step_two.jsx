import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setBookingDate,
  nextStep,
  prevStep,
} from "../../../redux/slices/bookingSlice";

import ProgressComponent from "./progress";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { eachDayOfInterval, parseISO } from "date-fns";

export default function StepTwo() {
  const dispatch = useDispatch();

  const [range, setRange] = useState(undefined);
  const [time, setTime] = useState("12:00");
  const [showError, setShowError] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const url = import.meta.env.VITE_BOOKING_API;

  const fetchBookedDates = async () => {
    try {
      console.log("Fetching booked dates...");
      const res = await axios.get(url);
      const dates= [];

      res.data.forEach((booking) => {
        if (!booking.bookingDate?.booking_date) {
          return;
        }

        const start = parseISO(booking.bookingDate.booking_date);
        const end = booking.bookingDate?.booking_end
          ? parseISO(booking.bookingDate.booking_end)
          : start;

        const range = eachDayOfInterval({ start, end });
        dates.push(...range);
      });

      console.log("Booked dates fetched:", dates);
      setDisabledDates(dates);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);


  const handleContinue = () => {
    if (!range?.from) {
      console.log("No start date selected.");
      setShowError(true);
      return;
    }

    const combineDateTime = (
      date,
      timeStr
    ) => {
      if (!date) return null;
      const [hours, minutes] = timeStr.split(":").map(Number);
      const combined = new Date(date);
      combined.setHours(hours, minutes, 0, 0);
      return combined.toISOString();
    };

    const bookingStart = combineDateTime(range.from, time);
    const bookingEnd = range.to ? combineDateTime(range.to, time) : null;

    console.log("Booking Start:", bookingStart);
    console.log("Booking End:", bookingEnd);
    console.log("Selected Time:", time);

    dispatch(
      setBookingDate({
        booking_date: bookingStart,
        booking_end: bookingEnd,
        booking_time: time,
      })
    );

    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={2} totalSteps={8} />

      <div className="min-w-[800px] bg-white rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Select Date & Time</h1>
        <p className="text-gray-600 mt-1">
          Choose one or two dates for your event and select the start time.
        </p>

        <div className="flex flex-row justify-between w-full gap-4 mt-8">
          <div className="border border-gray-200 px-6 py-4 rounded-md">
            <h1 className="py-2 font-semibold text-center">Select Date(s)</h1>
            <Calendar
              mode="range"
              selected={range}
              onSelect={(selectedRange) => {
                setRange(selectedRange);
                setShowError(false);
              }}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPast = date < today;

                const isBooked = disabledDates.some(
                  (d) => d.toDateString() === date.toDateString()
                );

                return isPast || isBooked;
              }}
              className="rounded-lg border border-gray-200"
              modifiers={{
                start: range?.from,
                end: range?.to,
              }}
              modifiersClassNames={{
                start: "bg-green-500 text-white",
                end: "bg-blue-500 text-white",
                disabled: "text-gray-400 cursor-not-allowed",
              }}
            />

            {range?.from && (
              <p className="mt-4 text-sm text-gray-600 text-center">
                Selected Start Date:{" "}
                <span className="font-medium">{range.from.toDateString()}</span>
              </p>
            )}
            {range?.to && (
              <p className="mt-1 text-sm text-gray-600 text-center">
                Selected End Date:{" "}
                <span className="font-medium">{range.to.toDateString()}</span>
              </p>
            )}
            {showError && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please select at least a start date to continue.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="border border-gray-200 p-4 rounded-md">
              <label htmlFor="time" className="block mb-2 font-medium">
                Select Start Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
              <h2 className="text-lg font-semibold mb-2">Booking Tips</h2>
              <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                <li>Weekends fill up fast—book early!</li>
                <li>For multi-day events, choose a start and end date.</li>
                <li>Start time is when your access begins.</li>
                <li>Venue may be unavailable on holidays.</li>
                <li>Double-check your selected dates before continuing.</li>
                <li>You can contact us for custom event setup needs.</li>
                <li>Consider additional time for setup and cleanup.</li>
                <li>Confirm the venue’s capacity matches your guest list.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between px-10 pt-8 w-full max-w-2xl">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button className="bg-black text-white" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
 