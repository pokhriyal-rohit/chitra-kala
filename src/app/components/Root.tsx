import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";

export function Root() {
  return (
    <div className="min-h-screen bg-[#0d0d14]">
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
}
