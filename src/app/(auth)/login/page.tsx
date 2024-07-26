"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useFormState } from "react-dom";
import { login } from "../../../../apis/userApi";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
export default function LoginPage() {
  return (
    <main>
      <LoginForm></LoginForm>
    </main>
  );
}
const INITIAL_STATE = {
  data: null,
};
function LoginForm() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["intern-last-login"]);
  const [formState, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      try {
        const result = await login(formData);
        if (result.id && result.token) {
          setCookie("intern-last-login", result.token);
          router.push(`/user`);
        }

        return { ...prevState, data: result };
      } catch (error) {
        return { ...prevState, error: (error as Error).message };
      }
    },
    INITIAL_STATE
  );
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="flex-col"
    >
      <Box
        sx={{
          width: { xs: "100%", md: "400px" },
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        className="bg-white"
      >
        <Typography variant="h3" align="center" gutterBottom>
          Login
        </Typography>
        <form action={formAction}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }} //Because of the label overflow with autocomplete => Shrink for error avoid
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }} //Because of the label overflow with autocomplete => Shrink for error avoid
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
              />
            </Grid>
            <Typography
              align="center"
              className="text-red-500 text-sm text-center w-full mt-2"
            >
              {formState.error}
            </Typography>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button href="/signup">Sign up</Button>
      </Box>
    </Container>
  );
}
