// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  Calendar,
  User,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        open ? "w-64" : "w-20"
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
  {open ? (
    <>
      {/* Left: Title */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Right: Chevron Button */}
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


      <div className="flex-1 p-2 space-y-2">
        <SidebarItem icon={<Home />} label="Home" open={open} />
        <SidebarItem icon={<Calendar />} label="Schedule" open={open} />
        <SidebarItem icon={<User />} label="Users" open={open} />
        <SidebarItem icon={<Settings />} label="Settings" open={open} />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, open }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-800 ${
        open ? "justify-start" : "justify-center"
      }`}
    >
      {icon}
      {open && <span>{label}</span>}
    </div>
  );
}
