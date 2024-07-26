"use client";
import { Button } from "@mui/material";

export default function RetrieveUserButton({ token }: { token?: string }) {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() => {
        if (!token) alert("Unauthorized");
      }}
    >
      Get user's data
    </Button>
  );
}
