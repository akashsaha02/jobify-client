import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from './../pages/Home/Home';
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Alljobs from "../pages/private/Jobs/Alljobs";
import AddJobs from "../pages/private/Jobs/AddJobs";
import JobDetails from "../pages/private/Jobs/JobDetails";
import Application from './../pages/private/Application/Application';
import MyApplication from './../pages/private/Application/MyApplication';
import MyJobs from './../pages/private/Jobs/MyJobs';
import ReviewApplication from './../pages/private/Application/ReviewApplication';
import UpdateJob from './../pages/private/Jobs/UpdateJob';
import PrivateRoute from "./PrivateRoute";
const apiBaseUrl = import.meta.env.VITE_API_URL;

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
                element: <Alljobs />
            },
            {
                path: "/add-jobs",
                element: <AddJobs />
            },
            {
                path: "/jobs/details/:id",
                element: <PrivateRoute>
                    <JobDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`${apiBaseUrl}/jobs/${params.id}`).then(res => res.json())
            },
            {
                path: "/application/apply/:id",
                element: <Application />
            },
            {
                path: "/application/me",
                element: <MyApplication />
            },
            {
                path: "/my-jobs",
                element: <MyJobs />
            },
            {
                path: "/my-jobs/:id",
                element: <ReviewApplication />
            },
            {
                path: "/jobs/update/:id",
                element: <UpdateJob />
            }
        ]
    },
]);

export default router;