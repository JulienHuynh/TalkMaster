import { Typography } from "@mui/material";
import type React from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoChevronBack, IoPersonCircle } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <div className="bg-gray-800 py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isCreatePage ? (
            <Link
              to="/"
              className="text-white p-2 rounded-full hover:bg-gray-700 mr-2 transition-colors"
            >
              <IoChevronBack size={24} />
            </Link>
          ) : null}
          <div className="flex items-center gap-2 cursor-pointer">
            <HiMiniUserGroup size={24} className="text-white" />
            <Typography
              variant="h2"
              fontFamily={"system-ui"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  color: "#990700",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                Talk
              </span>
              <span
                style={{
                  color: "#990700",
                  fontWeight: "lighter",
                  fontSize: "24px",
                }}
              >
                Master
              </span>
            </Typography>
          </div>
        </div>
        <div className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors">
          <IoPersonCircle size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
