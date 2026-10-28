import type { ComponentType } from "react"
import { createBrowserRouter } from "react-router"
import Root from "./Root"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"

// Secondary pages are code-split; the home page and 404/error boundary stay in the main chunk.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
})

// Vite's `base` may be a sub-path when deployed; keep the router in sync with it.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      ErrorBoundary: NotFound,
      children: [
        { index: true, Component: Home },
        { path: "work", lazy: page(() => import("@/pages/Work")) },
        { path: "work/:slug", lazy: page(() => import("@/pages/Project")) },
        { path: "about", lazy: page(() => import("@/pages/About")) },
        { path: "playground", lazy: page(() => import("@/pages/Playground")) },
        { path: "contact", lazy: page(() => import("@/pages/Contact")) },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  { basename },
)
