import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import type * as React from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import type { TalkProps } from "../type/talk.type";
import { fieldSx } from "../utils/helper";

interface CreateTalkProps {
  talk: TalkProps | null;
}

export const CreateTalk = ({ talk }: CreateTalkProps) => {
  const [date, setDate] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>(talk?.subject || "");
  const [description, setDescription] = useState<string>(
    talk?.description || "",
  );
  const [title, setTitle] = useState<string>(talk?.title || "");

  const location = useLocation();
  const isCreatePage = location.pathname === "/create-talk";
  const isEditPage = location.pathname === "/edit-talk/:id";

  // Reset all fields
  const handleCancel = () => {
    setSubject("");
    setDescription("");
    setDate(null);
    window.history.back();
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        {isCreatePage || isEditPage ? (
          <Link to="/talk" className="text-white p-2 rounded-full mr-2 ">
            <IoChevronBack size={24} />
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& > :not(style)": { m: 1 },
            width: "100%",
            maxWidth: "500px",
            p: 3,
            borderRadius: 2,
            bgcolor: "#333333",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ color: "#FFFFFF", textAlign: "center" }}
          >
            {isCreatePage ? "Créer un talk" : "Modifier un talk"}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="name-input"
              label="Titre"
              variant="outlined"
              sx={fieldSx}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="subject-select"
              label="Subject"
              select
              variant="outlined"
              sx={fieldSx}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <MenuItem value="tech">Technology</MenuItem>
              <MenuItem value="science">Science</MenuItem>
              <MenuItem value="art">Art</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </TextField>
          </FormControl>

          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date ? dayjs(date) : null}
                onChange={(newVal) => setDate(newVal?.toISOString() || null)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    sx: fieldSx,
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="description-input"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              sx={fieldSx}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button
              type="button"
              variant="outlined"
              sx={{
                backgroundColor: "#FFF",
                color: "#000",
                borderColor: "#000",
                "&:hover": {
                  backgroundColor: "#B00800",
                  borderColor: "#B00800",
                },
              }}
              onClick={handleCancel}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#CC0900",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#FFFFFF", color: "#000" },
              }}
            >
              Valider
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};
