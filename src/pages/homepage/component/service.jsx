
import {
  FaUtensils,
  FaMicrophone,
  FaCamera,
  FaPaintBrush,
  FaCar,
  FaShieldAlt,
  FaHeadset,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Services() {
  const services = [
    {
      serv_name: "Catering Services",
      serv_desc:
        "Professional catering with customizable menus for any dietary requirement",
      icon: <FaUtensils className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Audio/Visual Equipment Services",
      serv_desc:
        "State-of-the-art sound systems, lighting, and projection equipment",
      icon: <FaMicrophone className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Photography Services",
      serv_desc: "Professional photographers to capture your special moments",
      icon: <FaCamera className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Event Decoration",
      serv_desc: "Beautiful floral arrangements and custom decorations",
      icon: <FaPaintBrush className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Valet Parking",
      serv_desc: "Convenient valet parking service for your guests",
      icon: <FaCar className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Event Insurance",
      serv_desc: "Comprehensive event insurance for peace of mind",
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "24/7 Support",
      serv_desc: "Round-the-clock support from our event coordination team",
      icon: <FaHeadset className="text-3xl text-blue-500" />,
    },
    {
      serv_name: "Event Planning",
      serv_desc: "Professional event planners to help organize every detail",
      icon: <FaCalendarAlt className="text-3xl text-blue-500" />,
    },
  ];

  return (
    <section className="flex flex-col items-center  pt-20">
      <h1 className="text-4xl font-bold">Complete Event Solutions</h1>
      <p className="text-center max-w-xl text-xl font-medium text-gray-400 py-4">
        We provide everything you need to make your event perfect, from venue to
        catering and beyond.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-80 flex flex-col items-center text-center p-6 border border-gray-200 shadow-sm rounded"
          >
            <div className="mb-4">{service.icon}</div>
            <h1 className="font-medium text-lg">{service.serv_name}</h1>
            <p className="text-sm text-gray-600 mt-2">{service.serv_desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
