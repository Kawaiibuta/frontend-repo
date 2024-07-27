import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { cookies } from "next/headers";
import RetrieveUserButton from "../../../components/RetrieveUserButton";
const backend_url = process.env.BACKEND_URL;
export const metadata = {
  title: 'User data preview - Intern app'
}
export default async function User() {
  const cookieStore = cookies();
  var user: any = null;
  //This has been cached in layout so when this is call both in layout and in page
  //It will not waste any more time
  const response = await fetch(`${backend_url}/fetch-user-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieStore.get("intern-last-login")?.value}`,
    },
  });
  if (response.status == 200) user = await response.json();
  return user ? (
    <Card sx={{ maxWidth: 400, margin: "20px auto", width: "100%" }} className="rounded">
      <CardContent>
        <Typography variant="h4" component="div">
          User Information
        </Typography>
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
          <Typography variant="h6" gutterBottom>
            {user.name}
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
            Email:
          </Typography>
          <Typography variant="h6" gutterBottom>
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
          <Typography color="h6" gutterBottom>
            {user.dateOfBirth}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button fullWidth variant="contained" href="/user/edit">
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : (
    <RetrieveUserButton
      token={cookieStore.get("intern-last-login")?.value}
      backendUrl={backend_url ?? ""}
    ></RetrieveUserButton>
  );
}
