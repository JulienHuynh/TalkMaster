import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { MouseEvent } from "react";
import { IoChevronBack, IoPencil, IoTrash } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGetTalks } from "../hooks/useGetTalkRequests";

export const TalkList = () => {
  const navigate = useNavigate();
  const { talkData } = useGetTalks();

  const handleEdit = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/edit-talk/${id}`);
  };

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    alert(`Delete talk: ${id}`);
  };

  return (
    <div className="w-full mx-auto mt-6 ">
      <div>
        <Link to="/talk" className="text-white rounded-full ">
          <IoChevronBack size={24} />
        </Link>
      </div>
      <Typography variant="h4" component="h2" className="text-center pb-4">
        Modifier vos talks
      </Typography>

      <Stack spacing={2}>
        {talkData?.map((talk) => (
          <Card
            key={talk.id}
            sx={{
              bgcolor: "background.paper",
              position: "relative",
              overflow: "hidden",
              "&:hover .action-buttons": {
                opacity: 1,
                transform: "translateX(0)",
              },
              "&:hover": {
                "& .card-overlay": {
                  opacity: 1,
                },
              },
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "120px",
                borderTopLeftRadius: 1,
                borderTopRightRadius: 1,
              }}
            />
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {talk.title}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {talk.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date et durée de la conférence
              </Typography>
            </CardContent>

            {/* Overlay for better button visibility */}
            <Box
              className="card-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                opacity: 0,
                transition: "opacity 0.2s ease-in-out",
              }}
            />

            {/* Action Buttons */}
            <Box
              className="action-buttons"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) translateX(-20px)",
                opacity: 0,
                transition: "all 0.3s ease-in-out",
                zIndex: 1,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton
                onClick={(e) => handleEdit(e, talk.id.toString())}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <IoPencil size={20} />
              </IconButton>
              <IconButton
                onClick={(e) => handleDelete(e, talk.id.toString())}
                sx={{
                  bgcolor: "error.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                <IoTrash size={20} />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Stack>
    </div>
  );
};
