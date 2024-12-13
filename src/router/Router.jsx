import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from './../pages/Home/Home';
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Alljobs from "../pages/private/Alljobs";
import AddJobs from "../pages/private/AddJobs";

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
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/jobs",
                element: <Alljobs/>
            },{
                path: "/add-jobs",
                element:<AddJobs/>
            }
        ]
    },
]);

export default router;