import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateLayout from "../layouts/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Login />,
                errorElement: <NotFound />,
            },
            {
                path: "/register",
                element: <Register />,
                errorElement: <NotFound />,
            },
            {
                path: "/dashboard",
                element: <PrivateLayout />,
                errorElement: <NotFound />,

                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                        errorElement: <NotFound />,
                    },
                ],
            },
        ],
    },
]);
