import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useGetTalks } from "../hooks/useGetTalkRequests";

const statusColors = {
  pending: "#FFC107",
  accepted: "#4CAF50",
  rejected: "#F44336",
  plannified: "#2196F3",
};

const statusLabels = {
  pending: "En attente",
  accepted: "Accepté",
  rejected: "Refusé",
  plannified: "Planifié",
};

const TalkTracking = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { talkData } = useGetTalks();

  const filteredTalks = selectedStatus
    ? talkData?.filter((talk) => talk.status === selectedStatus)
    : talkData;

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
          onClick={() => setSelectedStatus("rejected")}
          variant={selectedStatus === "rejected" ? "contained" : "outlined"}
        >
          Refusés
        </Button>
        <Button
          onClick={() => setSelectedStatus("plannified")}
          variant={selectedStatus === "plannified" ? "contained" : "outlined"}
        >
          Planifiés
        </Button>
      </ButtonGroup>

      <Stack spacing={2}>
        {filteredTalks?.map((talk) => (
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
                  fill={statusColors[talk.status as keyof typeof statusColors]}
                  color={statusColors[talk.status as keyof typeof statusColors]}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      statusColors[talk.status as keyof typeof statusColors],
                  }}
                >
                  {statusLabels[talk.status as keyof typeof statusLabels]}
                </Typography>
              </Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {talk.title}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {talk.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {talk.date
                  ? new Date(talk.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : ""}{" "} pour une durée de {talk.duration * 15} minutes
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default TalkTracking;
