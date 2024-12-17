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
import MyApplication from './../pages/private/Application/MyApplication';
import MyJobs from './../pages/private/Jobs/MyJobs';
import ReviewApplication from './../pages/private/Application/ReviewApplication';
import UpdateJob from './../pages/private/Jobs/UpdateJob';
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/auth/Profile";
import ApplyJob from "../pages/private/Application/ApplyJob";
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
                path: "/profile",
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            }, 
            {
                path: "/add-jobs",
                element: <PrivateRoute>
                    <AddJobs />
                </PrivateRoute>
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
                element: <PrivateRoute >
                    <ApplyJob />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`${apiBaseUrl}/jobs/${params.id}`)
            },
            {
                path: "/application/me",
                element: <PrivateRoute>
                    <MyApplication />
                </PrivateRoute>,
            },
            {
                path: "/my-jobs",
                element: <PrivateRoute>
                    <MyJobs />
                </PrivateRoute>
            },
            {
                path: "/my-jobs/:id",
                element: <PrivateRoute>
                    <ReviewApplication />
                </PrivateRoute>
            },
            {
                path: "/jobs/update/:id",
                element: <UpdateJob />
            }
        ]
    },
]);

export default router;