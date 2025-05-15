import Button from "@mui/material/Button";
import type React from "react";
import AuthLayout from "../components/auth/Layout";

const Homepage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-2 mt-20">
        <Button
          variant="contained"
          size="large"
          className="w-full"
          sx={{ background: "#CC0900", textTransform: "none" }}
          onClick={() => {
            window.location.href = "/login?private=true";
          }}
        >
          Version Privée
        </Button>
        <Button
          variant="contained"
          size="large"
          className="w-full"
          sx={{ background: "white", textTransform: "none", color: "black" }}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Version Public
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Homepage;
