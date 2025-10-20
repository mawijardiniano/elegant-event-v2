import { useEffect, useState } from "react";
import ProgressComponent from "./progress";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  setPackage,
  setService,
  nextStep,
  prevStep,
} from "../../../redux/slices/bookingSlice";
import { FiCheck } from "react-icons/fi";

export default function StepFour() {
  const dispatch = useDispatch();
  const PACKAGE_API = import.meta.env.VITE_PACKAGE_API;
  const SERVICE_API = import.meta.env.VITE_SERVICE_API;

  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pkgRes, serviceRes] = await Promise.all([
          axios.get(PACKAGE_API),
          axios.get(SERVICE_API),
        ]);

        const packagesWithParsedFeatures = pkgRes.data.map((pkg) => ({
          ...pkg,
          features:
            typeof pkg.features === "string"
              ? pkg.features.split(",").map((f) => f.trim())
              : pkg.features,
        }));

        setPackages(packagesWithParsedFeatures);
        setServices(serviceRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAll();
  }, []);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg._id);
    dispatch(setPackage(pkg));
  };

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.serv_id === service.serv_id)
        ? prev.filter((s) => s.serv_id !== service.serv_id)
        : [...prev, service]
    );
  };

  const handleContinue = () => {
    if (selectedPackage === null) {
      alert("Please select a package before continuing.");
      return;
    }

    dispatch(setService(selectedServices));
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
      <p className="text-gray-500 text-lg mb-8 text-center max-w-2xl">
        Follow our simple booking process to reserve your perfect venue.
      </p>

      <ProgressComponent step={4} totalSteps={8} />

      <div className="min-w-[800px] bg-white rounded-lg p-6 border border-gray-200">
        <h1 className="font-bold text-2xl">Select Package & Add-ons</h1>
        <p className="text-gray-600 mt-1">
          Choose the package that best fits your needs and add any additional
          services.
        </p>

        <p className="mt-6 text-lg font-medium">Choose Your Package</p>
        <div className="flex flex-row flex-wrap justify-start gap-4 mt-2">
          {packages.map((p) => (
            <div
              key={p._id}
              onClick={() => handleSelectPackage(p)}
              className={`cursor-pointer border-1 ${
                selectedPackage === p._id ? "border-black" : "border-gray-200"
              } w-[250px] min-h-[350px] rounded-md p-4 hover:shadow-md transition`}
            >
              <p className="text-center text-xl font-bold mb-1">{p.pkg_name}</p>
              <p className="text-center text-xl font-bold mb-1">
                {p.pkg_price === 0
                  ? "(Included)"
                  : "₱" + p.pkg_price.toFixed(2)}
              </p>
              <p className="text-center text-gray-500 text-xs">{p.pkg_desc}</p>

              <ul className="mt-2 space-y-1">
                {Array.isArray(p.features) &&
                  p.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm gap-2">
                      <FiCheck className="text-blue-500" />
                      {feature}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Select Additional Services
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <label
                key={service.serv_id}
                className="border border-gray-200 p-4 flex items-center gap-3 cursor-pointer rounded-md hover:border-black transition"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.some(
                    (s) => s.serv_id === service.serv_id
                  )}
                  onChange={() => handleServiceToggle(service)}
                  className="accent-black"
                />
                <div>
                  <h3 className="font-medium">{service.serv_name}</h3>
                  <p className="text-sm text-gray-600">
                    ₱{service.serv_price.toFixed(2)}{" "}
                    {service.serv_type === "per_person"
                      ? "per person"
                      : service.serv_type === "per_event"
                      ? "per event"
                      : ""}
                  </p>
                </div>
              </label>
            ))}
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
