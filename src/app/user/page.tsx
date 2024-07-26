"use client";
import { Button, Container, TextField } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCookies } from "react-cookie";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
const backend_url = "http://127.0.0.1:1000";
export default function User() {
  const [cookies, setCookies] = useCookies(["intern-last-login"]);
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    fetch(`${backend_url}/fetch-user-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["intern-last-login"]}`,
      },
    }).then(async (value) => {
      if (value.status == 401) {
        setCookies("intern-last-login", null);
        return;
      }
      if (value.status == 200) setUser(await value.json());
    });
  }, []);
  function handleRetrieveData(): void {
    if (!cookies["intern-last-login"]) {
      alert("Unauthorized");
      return;
    }
    fetch(`${backend_url}/fetch-user-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["intern-last-login"]}`,
      },
    }).then(async (value) => {
      if (value.status == 401) {
        alert("Unauthorized");
        setCookies("intern-last-login", null);
        return;
      }
      if (value.status == 200) setUser(await value.json());
      else alert((await value.json()).message);
    });
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        className="absolute right-2 top-2"
        href="/login"
      >
        Login
      </Button>
      {user ? (
        <UserInfoDisplay
          name={user.name}
          email={user.email}
          dateOfBirth={user.dateOfBirth}
        />
      ) : (
        <Button fullWidth variant="contained" onClick={handleRetrieveData}>
          Get user's data
        </Button>
      )}
    </Container>
  );
}
function UserInfoDisplay({
  name,
  email,
  dateOfBirth,
}: {
  name: string | undefined;
  email: string;
  dateOfBirth: string | undefined;
}) {
  const [value, setValue] = useState<Dayjs | null>(
    dateOfBirth ? dayjs(Date.parse(dateOfBirth)) : null
  );
  const [nameValue, setName] = useState(name);
  return (
    <Card sx={{ maxWidth: 345, margin: "20px auto" }} className="rounded">
      <CardContent>
        <form>
          <Typography variant="h4" component="div">
            User Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Name:
            </Typography>
            <TextField
              value={nameValue}
              onChange={(value) => setName(value.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Email:
            </Typography>
            <Typography variant="h6" gutterBottom>
              {email}
            </Typography>{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Typography color="h6" gutterBottom>
              Date of Birth:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Button fullWidth variant="contained" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
