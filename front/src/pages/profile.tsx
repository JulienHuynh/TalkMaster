import { useState } from "react";
import { Typography, Button, Avatar, Stack } from "@mui/material";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/talk/navbar";

export const Profile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"organizer" | "public">("public");

  return (
    <div className="w-full items-center  max-w-xl mx-auto">
      <Navbar />
      <div className="mt-20">
        <div className="flex  items-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-white p-2 rounded-full hover:bg-gray-700 mr-2 transition-colors"
          >
            <IoChevronBack size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "grey.700",
              fontSize: "3rem",
              mb: 3,
            }}
          >
            JD
          </Avatar>

          <Typography variant="h4" component="h1" className="text-center">
            Satoru Gojo
          </Typography>

          <Stack spacing={2} sx={{ width: "100%", marginTop: 4 }}>
            <Button
              variant={role === "organizer" ? "contained" : "outlined"}
              color="inherit"
              size="large"
              fullWidth
              onClick={() => setRole("organizer")}
              sx={{
                py: 2,
                bgcolor: role === "organizer" ? "grey.700" : "transparent",
                "&:hover": {
                  bgcolor:
                    role === "organizer"
                      ? "grey.600"
                      : "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Passer sur le profil Organisateur
            </Button>

            <Button
              variant={role === "public" ? "contained" : "outlined"}
              color="inherit"
              size="large"
              fullWidth
              onClick={() => setRole("public")}
              sx={{
                py: 2,
                bgcolor: role === "public" ? "grey.700" : "transparent",
                "&:hover": {
                  bgcolor:
                    role === "public"
                      ? "grey.600"
                      : "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              Passer sur le profil Publique
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};
