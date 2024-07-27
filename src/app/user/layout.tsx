import { Button, Container } from "@mui/material";
import { cookies } from "next/headers";
import AuthButton from "../../../components/AuthButton";
const backend_url = process.env.BACKEND_URL;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const response = await fetch(`${backend_url}/fetch-user-data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieStore.get("intern-last-login")?.value}`,
    },
  });
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
      <AuthButton type={response.status == 200 ? 0 : 1} />
      {children}
    </Container>
  );
}
