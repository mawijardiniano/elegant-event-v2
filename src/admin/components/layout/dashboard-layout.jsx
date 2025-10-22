import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu, LogOut } from "lucide-react";
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()
     const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 ${
          open ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open ? (
            <>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-gray-800"
              >
                <ChevronLeft />
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-white hover:bg-gray-800"
              >
                <Menu />
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between flex-1">       
          <nav className="p-4">
            {open ? (
              <ul className="space-y-3">
                <li className="hover:bg-gray-800 rounded-md p-2 cursor-pointer">
                  🏠 Home
                </li>
                <li className="hover:bg-gray-800 rounded-md p-2 cursor-pointer">
                  📦 Packages
                </li>
                <li className="hover:bg-gray-800 rounded-md p-2 cursor-pointer">
                  📅 Bookings
                </li>
              </ul>
            ) : (
              <ul className="space-y-3 flex flex-col items-center">
                <li>🏠</li>
                <li>📦</li>
                <li>📅</li>
              </ul>
            )}
          </nav>

          <div className="p-4 border-t border-gray-700">
            {open ? (
              <ul className="space-y-3">
                <li onClick={handleLogout} className="hover:bg-gray-800 rounded-md p-2 cursor-pointer flex flex-row items-center gap-4">
                 <LogOut size={20} /> Admin
                </li>
              </ul>
            ) : (
              <ul className="space-y-3 flex flex-col items-center">
                <li onClick={handleLogout}><LogOut size={20} /></li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 p-6 ${
          open ? "ml-8" : "ml-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
