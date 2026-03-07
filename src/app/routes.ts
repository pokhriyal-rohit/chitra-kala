import { createBrowserRouter } from "react-router";
import React from "react";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Challenges } from "./pages/Challenges";
import { ChallengeDetail } from "./pages/ChallengeDetail";
import { Artists } from "./pages/Artists";
import { Profile } from "./pages/Profile";
import { DrawingDetail } from "./pages/DrawingDetail";
import { UploadPage } from "./pages/Upload";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Settings } from "./pages/Settings";
import { ErrorFallback } from "./components/ErrorFallback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: React.createElement(ErrorFallback),
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "challenges", Component: Challenges },
      { path: "challenges/:id", Component: ChallengeDetail },
      { path: "artists", Component: Artists },
      { path: "profile/:id", Component: Profile },
      { path: "drawing/:id", Component: DrawingDetail },
      { path: "upload", Component: UploadPage },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "settings", Component: Settings },
    ],
  },
]);
