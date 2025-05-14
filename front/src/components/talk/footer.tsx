import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChatbubblesOutline, IoNotificationsOutline } from "react-icons/io5";
const Footer: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-gray-800 py-2 fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto max-w-xl">
        <div className="flex items-center justify-around">
          <Link
            to="/talks"
            className={`flex flex-col items-center space-y-1 py-1 px-4 ${
              currentPath === "/talks" ? "text-white" : "text-gray-400"
            }`}
          >
            <IoChatbubblesOutline size={24} />
            <span className="text-sm">Talk</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex flex-col items-center space-y-1 py-1 px-4 ${
              currentPath === "/notifications" ? "text-white" : "text-gray-400"
            }`}
          >
            <IoNotificationsOutline size={24} />
            <span className="text-sm">Suivi</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
