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
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  MessageType,
  updateFail,
  updateLoading,
  updateSuccess,
} from "../store/actions";

export default function UpdateButton({ token, backendUrl }: { token: string, backendUrl: string }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const message = useAppSelector((state) => state.data.message);
  const messageType = useAppSelector((state) => state.data.messageType);

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
  const loading = useAppSelector((state) => state.data.loading);
  function handleUpdateUser() {
    dispatch(updateLoading());
    const data = {
      name:
        (document.getElementById("name-input") as HTMLInputElement).value ?? "",
      email: document.getElementById("email-label")?.innerText ?? "",
      dateOfBirth:
        (document.getElementById("date-input") as HTMLInputElement).value ?? "",
    };
    console.log(data);
    fetch(backendUrl + "/update-user-data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(async (value) => {
      if (!value.ok) {
        dispatch(updateFail(await value.text()));
      } else {
        dispatch(updateSuccess(await value.json()));
      }
      handleClick();
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageType == MessageType.SUCCESS ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
