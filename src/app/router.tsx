import { lazy } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./root-layout"

const HomePage = lazy(() => import("@/pages/home").then((m) => ({ default: m.HomePage })))
const ProjectsPage = lazy(() => import("@/pages/projects").then((m) => ({ default: m.ProjectsPage })))
const ProjectDetailPage = lazy(() => import("@/pages/project-detail").then((m) => ({ default: m.ProjectDetailPage })))
const NotFoundPage = lazy(() => import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })))

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
