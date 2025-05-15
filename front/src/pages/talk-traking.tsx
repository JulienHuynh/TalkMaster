import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { useGetTalks } from "../hooks/useGetTalkRequests";

interface Talk {
  id: string;
  title: string;
  subject: string;
  date: string;
  status: "pending" | "accepted" | "rejected" | "planned";
}

const mockTalks: Talk[] = [
  {
    id: "1",
    title: "Talk 1",
    subject: "Sujet 1",
    date: "2024-03-20",
    status: "pending",
  },
  {
    id: "2",
    title: "Talk 2",
    subject: "Sujet 2",
    date: "2024-03-21",
    status: "accepted",
  },
  {
    id: "3",
    title: "Talk 3",
    subject: "Sujet 3",
    date: "2024-03-22",
    status: "rejected",
  },
  {
    id: "4",
    title: "Talk 4",
    subject: "Sujet 4",
    date: "2024-03-23",
    status: "accepted",
  },
  {
    id: "5",
    title: "Talk 5",
    subject: "Sujet 5",
    date: "2024-03-24",
    status: "planned",
  },
];

const statusColors = {
  pending: "#FFC107",
  accepted: "#4CAF50",
  rejected: "#F44336",
  planned: "#2196F3",
};

const statusLabels = {
  pending: "En attente",
  accepted: "Accepté",
  rejected: "Refusé",
  planned: "Planifié",
};

const TalkTracking = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  // const { talkData, isLoading, error } = useGetTalks();

  // useEffect(() => {
  //   console.log(talkData);
  // }, [talkData]);

  const filteredTalks = selectedStatus
    ? mockTalks.filter((talk) => talk.status === selectedStatus)
    : mockTalks;

  return (
    <div className="w-full max-w-xl mt-6 mx-auto">
      <Typography variant="h4" component="h1" className="text-center mb-8">
        Suivi des talks
      </Typography>

      <ButtonGroup
        variant="outlined"
        className="w-full mb-6 flex flex-wrap gap-2"
        sx={{
          "& .MuiButton-root": {
            flex: "1 1 auto",
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          },
        }}
      >
        <Button
          onClick={() => setSelectedStatus(null)}
          variant={selectedStatus === null ? "contained" : "outlined"}
        >
          Tous
        </Button>
        <Button
          onClick={() => setSelectedStatus("pending")}
          variant={selectedStatus === "pending" ? "contained" : "outlined"}
        >
          En attente
        </Button>
        <Button
          onClick={() => setSelectedStatus("accepted")}
          variant={selectedStatus === "accepted" ? "contained" : "outlined"}
        >
          Acceptés
        </Button>
        <Button
          onClick={() => setSelectedStatus("rejected")}
          variant={selectedStatus === "rejected" ? "contained" : "outlined"}
        >
          Refusés
        </Button>
        <Button
          onClick={() => setSelectedStatus("planned")}
          variant={selectedStatus === "planned" ? "contained" : "outlined"}
        >
          Planifiés
        </Button>
      </ButtonGroup>

      <Stack spacing={2}>
        {filteredTalks.map((talk) => (
          <Card
            key={talk.id}
            sx={{
              bgcolor: "background.paper",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "120px",
              }}
            />
            <CardContent>
              <Box className="flex items-center gap-2 mb-2">
                <FaCircle
                  size={12}
                  fill={statusColors[talk.status]}
                  color={statusColors[talk.status]}
                />
                <Typography
                  variant="body2"
                  sx={{ color: statusColors[talk.status] }}
                >
                  {statusLabels[talk.status]}
                </Typography>
              </Box>
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

export default TalkTracking;
