import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from './../pages/Home/Home';
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            }
        ]
    },
]);

export default router;