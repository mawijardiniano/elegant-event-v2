import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-gray-200 py-4 px-8 transition-opacity duration-300 ${
        isScrolled ? "opacity-80 backdrop-blur-md shadow-md" : "opacity-100"
      }`}
    >
      <div className="flex flex-row justify-between items-center px-20">
        <h1 className="font-bold text-lg">Elegant Event</h1>
        <ul className="flex gap-8">
          <li><button onClick={handleHomeClick}>Home</button></li>
          <li><Link to="/venue">Venues</Link></li>
          <li><button onClick={() => handleNavClick("service")}>Services</button></li>
          <li><button onClick={() => handleNavClick("contact")}>Contacts</button></li>
        </ul>
        <div className="flex flex-row gap-4 items-center">
          <h1>(555) 123-4567</h1>
          <Link to="/booking">
            <Button className="bg-black text-white">Book now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
