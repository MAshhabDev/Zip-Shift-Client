import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Shared/Home/Home/Home";
import Coverage from "../Page/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Page/Auth/Login/Login";
import Registration from "../Page/Auth/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Page/Rider/Rider";
import SendParcel from "../Page/Send Parcel/SendParcel";
import DashBoardLayout from "../Layout/DashBoardLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                loader: () => fetch('../../public/warehouses.json').then(res => res.json()),
                Component: Coverage
            },
            {
                path: 'rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
            {
                path: 'sendParcel',
                loader: () => fetch('../../public/warehouses.json').then(res => res.json()),
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Registration
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>
    }
]

)