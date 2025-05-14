import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import type { TalkProps } from "../type/talk.type";
import { ChevronLeft } from "lucide-react";

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

  const handleTalkClick = (id: string) => {
    navigate(`/edit-talk/${id}`);
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
            onClick={() => handleTalkClick(talk.id)}
            sx={{
              marginTop: 2,
              bgcolor: "background.paper",
              cursor: "pointer",
              "&:hover": {
                transform: "translateX(8px)",
                transition: "transform 0.2s ease-in-out",
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
          </Card>
        ))}
      </Stack>
    </div>
  );
};
