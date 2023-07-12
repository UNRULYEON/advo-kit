import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import Login from "@/pages/login";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <AuthGuard>
        <div>Hello world!</div>
      </AuthGuard>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
