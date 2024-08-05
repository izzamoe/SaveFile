import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      let upload = await import("../pages/upload");
      return { Component: upload.default };
    },
  },
  {
    path : "/register",
    async lazy () {
      let regis = await import("../pages/register");
      return { Component: regis.default }
    }
  },
  {
    path: "/download/*",
    async lazy() {
      let download = await import("../pages/download");
      return { Component: download.default };
    },
  },
]);
