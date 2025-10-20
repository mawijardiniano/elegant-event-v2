import React, { useState } from "react";
import ProgressComponent from "./progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isGmail } from "../../../utils/regex";
import { z } from "zod";
import { useDispatch } from "react-redux";
import {
  prevStep,
  nextStep,
  setContactInfo,
} from "../../../redux/slices/bookingSlice";

const phoneNumber = z
  .string()
  .min(7, "Number is too short")
  .max(15, "Number is too long")
  .regex(/^[0-9]+$/, "Phone number must contain only digits");


export default function StepFive() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const showError = touched && email.length > 0 && !isGmail(email);

  const [number, setNumber] = useState("");
  const [touchedNumber, setTouchedNumber] = useState(false);
  const [numberError, setNumberError] = useState(null);

  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const isFormValid =
    [firstName, lastName, email, number].every(
      (field) => field.trim() !== ""
    ) && agreedToTerms;

  const validateNumber = (value) => {
    try {
      phoneNumber.parse(value);
      setNumberError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNumberError(error.errors[0].message);
      }
    }
  };

  const handleNumberChange = (e) => {
    const val = e.target.value;
    setNumber(val);
    validateNumber(val);
  };

  const handleContinue = () => {
    if (!firstName || !lastName || !email || !number) {
      alert("Please fill in all personal information fields.");
      return;
    }

    if (numberError) {
      alert(numberError);
      return;
    }

    if (!agreedToTerms) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    dispatch(
      setContactInfo({
        first_name: firstName,
        last_name: lastName,
        email,
        number,
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

      <ProgressComponent step={5} totalSteps={8} />

      <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h1 className="font-bold text-2xl">Contact Information</h1>
        <p className="text-gray-600 mt-1">
          Please provide your contact details for the booking confirmation and
          event coordination.
        </p>

        <div className="border border-gray-200 p-4">
          <h1 className="pb-4 font-semibold">Personal Information</h1>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-1 block">First Name</Label>
              <Input
                className="border border-gray-300"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-1 block">Last Name</Label>
              <Input
                className="border border-gray-300"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Email</Label>
              <Input
                className="border border-gray-300"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
              />
              {showError && (
                <p style={{ color: "red", marginTop: 4 }}>
                  Please enter a valid Gmail address.
                </p>
              )}
            </div>

            <div className="w-full">
              <Label className="mb-2 block">Number</Label>
              <Input
                className="border border-gray-300"
                placeholder="Enter your Phone Number"
                value={number}
                onChange={handleNumberChange}
                onBlur={() => setTouchedNumber(true)}
              />
              {touchedNumber && numberError && (
                <p style={{ color: "red", marginTop: 4 }}>{numberError}</p>
              )}
            </div>
          </div>

          <h2 className="mt-6 font-semibold mb-4">Address Information</h2>

          <div className="flex flex-row gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Street</Label>
              <Input
                className="border border-gray-300"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Barangay</Label>
              <Input
                className="border border-gray-300"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 mb-4">
            <div className="w-full">
              <Label className="mb-2 block">Municipality</Label>
              <Input
                className="border border-gray-300"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Province/City</Label>
              <Input
                className="border border-gray-300"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 block">Zip Code</Label>
              <Input
                className="border border-gray-300"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms((prev) => !prev)}
              />
              <span>
                I agree to the{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/policy" className="text-blue-500 underline">
                  Privacy Policy
                </a>{" "}
                *
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={() => setSubscribeNewsletter((prev) => !prev)}
              />
              <span>
                Subscribe to our newsletter for event tips and special offers
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-between px-10 pt-8">
          <Button
            className="bg-black text-white"
            onClick={() => dispatch(prevStep())}
          >
            Previous
          </Button>
          <Button
            className={`text-white ${
              isFormValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
