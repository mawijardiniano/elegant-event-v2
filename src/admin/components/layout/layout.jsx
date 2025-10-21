import React from "react";
import Sidebar from "./sidebar";


export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />

      <main className="flex-grow">{children}</main>
    </div>
  );
}
