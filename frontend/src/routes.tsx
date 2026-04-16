import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { PhotoGallery } from "./pages/PhotoGallery";
import { DonationPage } from "./pages/DonationPage";
import { MessagesPage } from "./pages/MessagesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/photos",
    Component: PhotoGallery,
  },
  {
    path: "/donate",
    Component: DonationPage,
  },
  {
    path: "/messages",
    Component: MessagesPage,
  },
]);
