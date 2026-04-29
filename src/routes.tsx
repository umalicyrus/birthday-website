import { createBrowserRouter } from "react-router";
import { LandingPage } from "./app/pages/LandingPage";
import { PhotoGallery } from "./app/pages/PhotoGallery";
import { MessagesPage } from "./app/pages/MessagesPage";

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
    path: "/messages",
    Component: MessagesPage,
  },
]);
