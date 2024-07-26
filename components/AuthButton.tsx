"use client";
import { Button } from "@mui/material";
import { positions } from "@mui/system";
import { Cookies, useCookies } from "react-cookie";

export default function AuthButton({ type }: { type: number }) {
  return (
    <Button variant="contained" sx={{ position: "absolute", right: "2vw", top: "2vw" }} href="/login">
      {type == 0 ? "Log out" : "Log in"}
    </Button>
  );
}
