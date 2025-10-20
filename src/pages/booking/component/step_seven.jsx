import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ProgressComponent from "./progress";
import { prevStep, nextStep } from "../../../redux/slices/bookingSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function StepSeven() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const venue = useSelector((state) => state.booking.venue);
  const pkg = useSelector((state) => state.booking.package);
  const service = useSelector((state) => state.booking.service);
  const guestInfo = useSelector((state) => state.booking.guest_info);
  const contactInfo = useSelector((state) => state.booking.contact_info);
  const booking_date = useSelector((state) => state.booking.bookingDate);
  const totalPrice = useSelector((state) => state.booking.total_price);

  const venuePrice = venue?.venue_price || 0;
  const packagePrice = pkg?.package_price || 0;
  const expectedGuests = guestInfo?.expected_guest || 1;

  const servicesTotal = (service || []).reduce((acc, s) => {
    const perPersonPrice = s.serv_type === "per_person" ? expectedGuests : 1;
    return acc + (s.serv_price || 0) * perPersonPrice;
  }, 0);

  const total = venuePrice + packagePrice + servicesTotal;

  const [name, setName] = useState("");
  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    console.log("💳 Starting payment process...");
    setCardError(null);

    if (!name.trim()) {
      setCardError("Please enter the name on the card.");
      return;
    }

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Card element not found.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(import.meta.env.VITE_PAYMENT_API, {
        amount: total * 100,
        email: contactInfo?.email,
      });

      if (!data.clientSecret) throw new Error("Missing client secret");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement, billing_details: { name } },
      });

      if (result.error) {
        setCardError(result.error.message || "Payment failed.");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const bookingPayload = {
          venue: venue?._id,
          package: pkg?._id ?? undefined,
          booking_start: booking_date?.booking_date
            ? new Date(booking_date.booking_date).toISOString()
            : undefined,
          booking_end: booking_date?.booking_end
            ? new Date(booking_date.booking_end).toISOString()
            : undefined,
          booking_time: booking_date?.booking_time ?? undefined,
          total_price: total,
          event: guestInfo?.event_type ?? undefined,
          expected_guest: guestInfo?.expected_guest ?? 0,
          event_name: guestInfo?.event_name ?? "",
          description: guestInfo?.description ?? undefined,
          request: guestInfo?.request ?? undefined,
          first_name: contactInfo?.first_name ?? "",
          last_name: contactInfo?.last_name ?? "",
          email: contactInfo?.email ?? "",
          number: contactInfo?.number ?? "",
          service: (service ?? []).map((s) => ({ _id: s._id })),
        };

        console.log("📤 Sending booking to backend:", bookingPayload);
        const bookingRes = await axios.post(
          import.meta.env.VITE_ADD_BOOKING_API,
          bookingPayload
        );

        console.log("📥 Booking API response:", bookingRes.data);
        dispatch(nextStep());
      }
    } catch (err) {
      console.error("❌ Payment/Booking error:", err);
      setCardError(
        err.response?.data?.error ||
          err.message ||
          "Something went wrong during payment."
      );
    } finally {
      setLoading(false);
      console.log("🔚 Payment process ended.");
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={7} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <p className="mb-4 text-gray-600">
          Secure payment processing. Your information is encrypted and
          protected.
        </p>

        <div className="flex flex-row gap-8">
          <div className="border border-gray-200 p-4 w-full">
            <h2 className="text-lg font-semibold mb-1">Card Information</h2>

            <label htmlFor="name" className="block mb-1 font-medium">
              Name on Card
            </label>
            <input
              id="name"
              type="text"
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-1 font-medium">Card Details</label>
            <div className="border border-gray-300 p-3 rounded mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                      fontFamily: "Arial, sans-serif",
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
                onChange={(e) => setCardError(e.error ? e.error.message : null)}
              />
            </div>

            {cardError && <p className="text-red-600 mb-2">{cardError}</p>}
          </div>

          <div className="w-full border border-gray-200 p-4">
            <h2 className="text-lg font-semibold mb-1">Order Summary</h2>
            <div className="flex flex-row justify-between">
              <p>{venue?.venue_name}</p>
              <p>₱{venuePrice.toLocaleString()}</p>
            </div>

            {(packagePrice > 0 || (service?.length ?? 0) > 0) && (
              <div>
                {packagePrice > 0 && (
                  <div className="flex flex-row justify-between">
                    <p>{pkg?.package_name} Package</p>
                    <p>₱{packagePrice.toLocaleString()}</p>
                  </div>
                )}

                {service && service.length > 0 && (
                  <div className="mt-2">
                    <ul className="list-none list-inside">
                      {service.map((s, idx) => {
                        const isPerPerson = s.serv_type === "per_person";
                        const price = isPerPerson
                          ? (s.serv_price || 0) * expectedGuests
                          : s.serv_price || 0;

                        return (
                          <li
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            {s.serv_name}
                            <span>
                              ₱{price.toLocaleString()}
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
                <p className="text-lg font-bold flex flex-row justify-between">
                  Total: <span>₱{total.toLocaleString()}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
            disabled={loading}
          >
            Previous
          </Button>

          <Button
            className="bg-black text-white hover:bg-black/80 disabled:bg-gray-400"
            onClick={handlePayment}
            disabled={!stripe || loading || totalPrice <= 0}
          >
            {loading ? "Processing…" : `Pay ₱${totalPrice.toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
