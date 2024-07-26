"use client";

import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import UpdateButton from "./UpdateButton";
import { useEffect } from "react";
import { getUserData } from "../apis/userApi";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function UserForm({token}: {token: string}) {
  const user = useAppSelector((state) => state.data.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    getUser()
  }, []);
  async function getUser () {
    const response = await getUserData(token)
    if (response.status == 401) {
        cookieStore.delete("intern-last-login");
        return;
    }
    if (value.status == 200) user = await value.json();
  }
  return (
    <Card
      sx={{ maxWidth: 400, margin: "20px 0px", width: "100%" }}
      className="rounded"
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
            marginTop: "16px",
          }}
        >
          <Typography variant="h4" component="div">
            User Information
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
            marginTop: "16px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Name:
          </Typography>
          <TextField id="name-input" name="name" defaultValue={user.name} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
            marginTop: "16px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Email:
          </Typography>
          <Typography variant="h6" gutterBottom id="email-label">
            {user.email}
          </Typography>{" "}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "left", md: "center" },
            marginTop: "16px",
          }}
        >
          <Typography color="h6" gutterBottom>
            Date of Birth:
          </Typography>
          <TextField
            name="dateOfBirth"
            id="date-input"
            type="date"
            defaultValue={new Date(Date.parse(user.dateOfBirth))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <UpdateButton
          token={cookieStore.get("intern-last-login")?.value ?? ""}
        ></UpdateButton>
      </CardContent>
    </Card>
  );
}
