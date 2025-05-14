import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import type { TalkProps } from "../type/talk.type";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";

const mockTalks: TalkProps[] = [
  {
    id: "1",
    title: "Talk 1",
    subject: "Sujet 1",
    description: "Description 1",
    date: "2024-03-20",
  },
  {
    id: "2",
    title: "Talk 2",
    subject: "Sujet 2",
    description: "Description 2",
    date: "2024-03-21",
  },
  {
    id: "3",
    title: "Talk 3",
    subject: "Sujet 3",
    description: "Description 3",
    date: "2024-03-22",
  },
  {
    id: "4",
    title: "Talk 4",
    subject: "Sujet 4",
    description: "Description 4",
    date: "2024-03-23",
  },
  {
    id: "5",
    title: "Talk 5",
    subject: "Sujet 5",
    description: "Description 5",
    date: "2024-03-24",
  },
];

export const TalkList = () => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/edit-talk/${id}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    alert(`Delete talk: ${id}`);
  };

  return (
    <div className="w-full mx-auto mt-6 ">
      <div>
        <Link to="/talk" className="text-white rounded-full ">
          <ChevronLeft size={24} />
        </Link>
      </div>
      <Typography variant="h4" component="h2" className="text-center pb-4">
        Modifier vos talks
      </Typography>

      <Stack spacing={2}>
        {mockTalks.map((talk) => (
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
                onClick={(e) => handleEdit(e, talk.id)}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <Pencil size={20} />
              </IconButton>
              <IconButton
                onClick={(e) => handleDelete(e, talk.id)}
                sx={{
                  bgcolor: "error.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                <Trash2 size={20} />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Stack>
    </div>
  );
};
