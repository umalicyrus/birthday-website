import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import supabase from "./lib/supabase";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </>
  );
}
