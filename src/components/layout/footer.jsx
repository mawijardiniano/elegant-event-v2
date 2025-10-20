
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-700 px-8 py-12 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h1 className="font-bold text-2xl text-black mb-2">Elegant Event</h1>
          <p className="text-sm leading-relaxed">
            Creating unforgettable moments with premium venues and exceptional services.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-black mb-3">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/venue" className="hover:text-black transition-colors">Venues</Link>
            </li>
            <li>
              <button onClick={() => handleNavClick("service")} className="text-left hover:text-black transition-colors">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("contact")} className="text-left hover:text-black transition-colors">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-black mb-3">Services</h2>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>🎉 Event Planning</li>
            <li>🎨 Venue Decoration</li>
            <li>🍽 Catering Services</li>
          </ul>
        </div>


        <div>
          <h2 className="font-semibold text-lg text-black mb-3">Contact Info</h2>
          <ul className="text-sm space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <HiPhone /> (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <HiMail /> events@elegantevents.com
            </li>
            <li className="flex items-center gap-2">
              <HiLocationMarker /> Makati City, PH
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Elegant Event. All rights reserved.
      </div>
    </footer>
  );
}
