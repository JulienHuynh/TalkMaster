import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type * as React from "react";
import type { CreateTalkProps } from "../../types/Talk";
import { fieldSx } from "../../utils/helper";

interface TalkFormProps {
  talk: CreateTalkProps;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const TalkForm: React.FC<TalkFormProps> = ({
  talk,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { title, subject, date, description, duration };
    onSubmit(formData);
  };

  useEffect(() => {
    setTitle(talk.title);
    setSubject(talk.subject);
    setDate(talk.date);
    setDescription(talk.description || "");
    setDuration(talk.duration || 0);
  }, [talk]);

  return (
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
        {isEdit ? "Modifier un talk" : "Créer un talk"}
      </Typography>

      <FormControl fullWidth>
        <TextField
          id="name-input"
          label="Name"
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
            value={dayjs(date)}
            onChange={(newVal) => setDate(newVal?.toDate())}
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
          id="duration-input"
          label="Duration"
          select
          variant="outlined"
          sx={fieldSx}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <MenuItem value="15">15 minutes</MenuItem>
          <MenuItem value="30">30 minutes</MenuItem>
          <MenuItem value="45">45 minutes</MenuItem>
        </TextField>
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
          onClick={onCancel}
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
          {isEdit ? "Modifier" : "Créer"}
        </Button>
      </Box>
    </Box>
  );
};
