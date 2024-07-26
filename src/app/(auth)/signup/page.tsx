"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { FormEvent } from "react";
import { signup } from "../../../../apis/userApi";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
export default function SignupPage() {
  return (
    <main>
      <SignupForm></SignupForm>
    </main>
  );
}
const INITIAL_STATE = {
  data: null,
};
function SignupForm() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['intern-last-login'])

  const [formState, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      try {
        const result = await signup(formData);
        if (result.token && result.id){
          setCookie("intern-last-login",  result.token)
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
          Sign up
        </Typography>
        <form autoComplete="off" action={formAction}>
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
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }} //Because of the label overflow with autocomplete => Shrink for error avoid
                fullWidth
                label="Confirm password"
                type="password"
                name="re-password"
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
                Signup
              </Button>
            </Grid>
          </Grid>
        </form>

        <Button href="/login">Login</Button>
      </Box>
    </Container>
  );
}
