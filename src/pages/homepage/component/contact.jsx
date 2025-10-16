
import { FaClock, FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import Form from "./form";

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaLocationArrow className="text-xl text-blue-500" />,
      title: "Address",
      detail: "Isok 1",
    },
    {
      icon: <FaPhone className="text-xl text-blue-500" />,
      title: "Phone",
      detail: "(555) 123-4567",
    },
    {
      icon: <FaEnvelope className="text-xl text-blue-500" />,
      title: "Email",
      detail: "events@elegantevents.com",
    },
    {
      icon: <FaClock className="text-xl text-blue-500" />,
      title: "Business Hours",
      detail: "Mon–Fri: 9AM–6PM, Sat–Sun: 10AM–4PM",
    },
  ];

  const reasons = [
    "5+ years of event planning experience",
    "Professional and dedicated staff",
    "Flexible packages and custom solutions",
    "Premium venues in prime locations",
    "Full-service event coordination",
  ];

  return (
    <section className="flex flex-col items-center py-26 px-4">
      <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
      <p className="text-center max-w-xl text-xl font-medium text-gray-400 mb-8">
        Ready to plan your perfect event? Contact us today and let's make your
        vision come to life.
      </p>

      <div className="w-full flex flex-col lg:flex-row gap-12 px-4 lg:px-20">
        <div className="w-full lg:w-1/2 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="flex flex-col gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  {info.icon}
                  <div>
                    <h3 className="font-semibold text-md">{info.title}</h3>
                    <p className="text-gray-600 text-sm">{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {reasons.map((reason, idx) => (
                <li key={idx} className="text-md text-gray-500">{reason}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <Form />
        </div>
      </div>
    </section>
  );
}
