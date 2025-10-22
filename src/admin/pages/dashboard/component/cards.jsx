import React from "react";

export default function Cards() {
  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="flex-1 h-40 border border-gray-200 rounded-lg bg-white flex items-center justify-center">
        Card 1
      </div>
      <div className="flex-1 h-40 border border-gray-200 rounded-lg bg-white flex items-center justify-center">
        Card 2
      </div>
      <div className="flex-1 h-40 border border-gray-200 rounded-lg bg-white flex items-center justify-center">
        Card 3
      </div>
    </div>
  );
}
