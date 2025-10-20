import { useEffect, useState } from "react";
import ProgressComponent from "./progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  setGuestInfo,
  nextStep,
  prevStep,
} from "../../../redux/slices/bookingSlice";
import { z } from "zod";

const guestInfoSchema = z.object({
  event_type: z.string().min(1, "Event type is required"),
  expected_guest: z
    .string()
    .min(1, "Guest count is required")
    .regex(/^\d+$/, "Guest count must be a number"),
  event_name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  request: z.string().optional(),
});

export default function StepThree() {
  const dispatch = useDispatch();


  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [guestCount, setGuestCount] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [request, setRequest] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = (
   
  ) => {
    const formData = {
      event_type: selectedEvent?.event_name || "",
      expected_guest: guestCount,
      event_name: eventName,
      description,
      request,
    };

    const result = guestInfoSchema.safeParse(formData);
    const errors= {};
   
    setFormErrors(errors);
    return result.success;
  };

  const handleContinue = () => {
    setTouched({
      event_type: true,
      expected_guest: true,
      event_name: true,
    });

    if (!validateForm()) return;

    const payload = {
      event_type: selectedEvent.event_name,
      expected_guest: parseInt(guestCount),
      event_name: eventName,
      description,
      request,
    };

    console.log("data", payload)

    dispatch(setGuestInfo(payload));
    dispatch(nextStep());
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_EVENT_API);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching Events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  });

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={3} totalSteps={8} />

      <div className="min-w-[800px] bg-white rounded-lg p-6 border border-gray-200">
        <h1 className="font-bold text-2xl">Event Details</h1>
        <p className="text-gray-600 mt-1">
          Tell us more about your event so we can provide the best service.
        </p>

        <div className="border border-gray-200 p-4 mt-4">
          <div className="flex flex-row justify-between gap-8">
            <div className="w-full pb-2">
              <Label className="mb-1 block">
                Event Type<span className="text-red-500 ">*</span>
              </Label>
              <Select
                value={selectedEvent?.event_name}
                onValueChange={(value) => {
                  const found = events.find(
                    (event) => event.event_name === value
                  );
                  setSelectedEvent(found ?? null);
                  validateForm({ event_name: value });
                  markTouched("event_name");
                }}
              >
                <SelectTrigger className="w-[350px] border border-gray-300">
                  <SelectValue placeholder="Choose Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {events.map((event) => (
                    <SelectItem
                      key={event._id}
                      value={event.event_name}
                    >
                      {event.event_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.event_name && formErrors.event_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.event_name}
                </p>
              )}
            </div>

            <div className="w-full">
              <Label className="mb-1 block">
                Expected Guest Count<span className="text-red-500 ">*</span>
              </Label>
              <Input
              
                value={guestCount}
                className="border border-gray-300"
                onChange={(e) => {
                  setGuestCount(e.target.value);
                  validateForm({ expected_guest: e.target.value });
                }}
                onBlur={() => markTouched("expected_guest")}
              />
              {touched.expected_guest && formErrors.expected_guest && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.expected_guest}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="mb-1 block">
              Event Name<span className="text-red-500 ">*</span>
            </Label>
            <Input

              className="w-full border border-gray-300"
              value={eventName}
              onChange={(e) => {
                setEventName(e.target.value);
                validateForm({ event_name: e.target.value });
              }}
              onBlur={() => markTouched("event_name")}
            />
            {touched.event_name && formErrors.event_name && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.event_name}
              </p>
            )}

            <Label className="mb-1 block">Event Description</Label>
            <Textarea
              className="w-full  border border-gray-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Label className="mb-1 block">
              Special Requests or Accommodations
            </Label>
            <Textarea
              className="w-full  border border-gray-300"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between px-10 pt-8">
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
