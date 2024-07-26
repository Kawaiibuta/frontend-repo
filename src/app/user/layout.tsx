import { Button, Container } from "@mui/material";
import { cookies } from "next/headers";
import AuthButton from "../../../components/AuthButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <AuthButton type={cookies().get("intern-last-login") ? 0 : 1}/>
      {children}
    </Container>
  );
}
