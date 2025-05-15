import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import { useState } from "react";
import type * as React from "react";
import { useMemo } from "react";
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
}: TalkFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const defaultDate = talk.date ? new Date(talk.date) : new Date();
  defaultDate.setHours(9, 0, 0, 0);

  // if we have a default talk, we can use it to set the initial values
  const defaultTalk = useMemo(() => {
    return {
      title: talk.title || "",
      subject: talk.subject || "tech",
      // date: new Date(talk.date),
      description: talk.description || "",
      duration: talk.duration || 1,
    };
  }, [talk]);

  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(defaultDate);
  const [title, setTitle] = useState<string>(talk.title);
  const [subject, setSubject] = useState<string>(talk.subject);
  const [description, setDescription] = useState<string>(
    talk.description || "",
  );
  const [duration, setDuration] = useState<number>(talk.duration);

  const validateDate = (selectedDate: Date | null) => {
    if (!selectedDate) {
      setError("Ce champ est requis");
      return false;
    }

    const hour = selectedDate.getHours();
    if (hour < 9 || hour >= 18) {
      setError("L'heure doit être entre 9h00 et 18h00");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { title, subject, date, description, duration };
    if (!validateDate(date)) {
      enqueueSnackbar(
        "Veuillez sélectionner une date valide entre 9h00 et 18h00",
        {
          variant: "error",
        },
      );
      return;
    }
    onSubmit(formData);
  };

  return (
    <Stack
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
      autoComplete="off"
      gap={1}
    >
      <button type="button" onClick={() => validateDate(date)}>
        coucou
      </button>
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
          value={defaultTalk.title || title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="subject-select"
          label="Subject"
          select
          variant="outlined"
          sx={fieldSx}
          value={defaultTalk.subject || subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <MenuItem value="tech">Technology</MenuItem>
          <MenuItem value="science">Science</MenuItem>
          <MenuItem value="art">Art</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </TextField>
      </FormControl>

      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date"
            value={dayjs(date)}
            onChange={(newVal) => newVal && setDate(newVal.toDate())}
            minutesStep={15}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            shouldDisableTime={(timeValue, clockType) => {
              if (clockType === "hours") {
                const hour =
                  typeof timeValue === "number"
                    ? timeValue
                    : (timeValue as Dayjs).hour();
                return hour < 9 || hour > 17;
              }
              return false;
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                required: true,
                error: Boolean(error),
                InputLabelProps: {
                  style: { color: "white" }, // couleur du label
                },
                InputProps: {
                  style: { color: "white" }, // couleur du texte saisi
                  contentEditable: false, // désactive l'édition directe du champ
                },
                sx: {
                  "& .MuiInputBase-input": {
                    color: "white", // texte saisi
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // label
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // icône calendrier
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // bordure normale
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // bordure au survol
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // bordure au focus
                  },
                },
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
          value={defaultTalk.duration || duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        >
          <MenuItem value={1}>15 minutes</MenuItem>
          <MenuItem value={2}>30 minutes</MenuItem>
          <MenuItem value={3}>45 minutes</MenuItem>
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
          value={defaultTalk.description || description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
    </Stack>
  );
};
