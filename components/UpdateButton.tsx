"use client";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState, FormEvent } from "react";
import { useCookies } from "react-cookie";
const backend_url = "http://127.0.0.1:1000";

export default function UpdateButton({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("info");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  function handleUpdateUser() {
    setLoading(true);
    const data = {
      name:
        (document.getElementById("name-input") as HTMLInputElement).value ?? "",
      email: document.getElementById("email-label")?.innerText ?? "",
      dateOfBirth:
        (document.getElementById("date-input") as HTMLInputElement).value ?? "",
    };
    console.log(data);
    fetch(backend_url + "/update-user-data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(async (value) => {
      if (!value.ok) {
        setError(await value.text());
        setType("error");
      } else {
        setError("Successfully update user's data.");
        setType("success");
      }
      handleClick();
      setLoading(false);
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Button fullWidth variant="contained" onClick={handleUpdateUser}>
            Update
          </Button>
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          onClose={handleClose}
          severity={type == "error" ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
