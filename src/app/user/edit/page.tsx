import {
  Box,
  Button,
  Card,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { cookies } from "next/headers";
import UpdateButton from "../../../../components/UpdateButton";

const backend_url = process.env.BACKEND_URL;

export default async function EditForm() {
  const cookieStore = cookies();
  var user: any = null;
  await fetch(`${backend_url}/fetch-user-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieStore.get("intern-last-login")?.value}`,
    },
  }).then(async (value) => {
    if (value.status == 401) {
      cookieStore.delete("intern-last-login");
      return;
    }
    if (value.status == 200) user = await value.json();
  });
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
