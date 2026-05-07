import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import RoomListing from "./pages/RoomListing";
import RoomDetails from "./pages/RoomDetails";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "rooms", Component: RoomListing },
      { path: "room/:type/:number", Component: RoomDetails },
      { path: "reservation", Component: Reservation },
      { path: "contact", Component: Contact },
    ],
  },
]);
