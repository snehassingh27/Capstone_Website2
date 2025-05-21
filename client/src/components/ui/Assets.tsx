import React from "react";

export function KnotsWebsiteImage() {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center p-4 bg-white">
        <div className="text-center mb-4">
          <h3 className="font-medium text-gray-900">The Knots Studio Website</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">Website showcasing beautifully crafted gift items</p>
        <div className="border p-2 rounded-lg">
          <img 
            src="https://i.ibb.co/7GzPWR2/image-1747797307958.png" 
            alt="The Knots Studio Website" 
            className="w-full" 
          />
        </div>
      </div>
    </div>
  );
}

export function GolocansImage() {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center p-4 bg-white">
        <div className="text-center mb-4">
          <h3 className="font-medium text-gray-900">Retrospective in the Island of Golocans</h3>
        </div>
        <div className="border p-2 rounded-lg">
          <img 
            src="https://i.ibb.co/K7vTj3t/image-1747797347921.png" 
            alt="Retrospective in the Island of Golocans" 
            className="w-full" 
          />
        </div>
      </div>
    </div>
  );
}