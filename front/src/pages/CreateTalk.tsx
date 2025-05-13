import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { fieldSx } from "../utils/helper";

export default function CreateTalk() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // Reset all fields
  const handleCancel = () => {
    setName("");
    setSubject("");
    setDate(null);
    setDescription("");
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { name, subject, date: date?.format(), description };
    console.log("Form submitted with:", formData);
    // TODO: Add your API call or further processing here
  };

  return (
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
          Créer un talk
        </Typography>

        <FormControl fullWidth>
          <TextField
            id="name-input"
            label="Name"
            variant="outlined"
            sx={fieldSx}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              value={date}
              onChange={(newVal) => setDate(newVal)}
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
              "&:hover": { backgroundColor: "#B00800", borderColor: "#B00800" },
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
  );
}
