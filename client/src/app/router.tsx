import { Navigate, createBrowserRouter } from "react-router-dom";
import { BuilderPage } from "@/pages/BuilderPage";
import { FillPage } from "@/pages/FillPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ResponsesPage } from "@/pages/ResponsesPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/forms", element: <Navigate to="/" replace /> },
  { path: "/forms/", element: <Navigate to="/" replace /> },
  { path: "/forms/:id/edit", element: <BuilderPage /> },
  { path: "/forms/:id/responses", element: <ResponsesPage /> },
  { path: "/forms/:id", element: <FillPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
