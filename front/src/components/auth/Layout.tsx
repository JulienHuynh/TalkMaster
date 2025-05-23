import Typography from "@mui/material/Typography";
import type * as React from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="authlayout flex flex-col h-screen pt-10">
      {location.pathname !== "/" && (
        <div className="flex justify-start w-full">
          <button
            type="button"
            onClick={() => {
              window.history.back();
            }}
            className="text-white text-2xl"
          >
            &#8592;
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <HiMiniUserGroup size={100} color="#CC0900" />
        <Typography variant="h2" fontFamily={"system-ui"}>
          <span style={{ color: "#990700", fontWeight: "bold" }}>Talk</span>
          <span style={{ color: "#990700", fontWeight: "lighter" }}>
            Master
          </span>
        </Typography>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
