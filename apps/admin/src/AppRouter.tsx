import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import Login from "@/pages/login";
import Decks from "@/pages/decks";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AuthGuard>:)</AuthGuard>,
  },
  {
    path: "/admin/decks",
    element: (
      <AuthGuard>
        <Decks />
      </AuthGuard>
    ),
  },
  {
    path: "/admin/cards",
    element: (
      <AuthGuard>
        <div>cards</div>
      </AuthGuard>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
