"use client";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { authorized, unauthorized, verifyLoading } from "../store/actions";

export default function RetrieveUserButton({
  token,
  backendUrl,
}: {
  token?: string;
  backendUrl: string;
}) {
  const loading = useAppSelector((state) => state.data.loading);
  const dispatch = useAppDispatch();
  if (loading) return <CircularProgress></CircularProgress>;
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={async () => {
        if (!token) {
          alert("Unauthorized");
          return;
        }
        dispatch(verifyLoading());
        const response = await fetch(`${backendUrl}/fetch-user-data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status != 200) {
          dispatch(unauthorized(await response.text()));
          alert("Unauthorized, please log in before retrieve data");
        } else dispatch(authorized(await response.json()));
      }}
    >
      Get user's data
    </Button>
  );
}
