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
import MyParcels from "../Page/Dashboard/MyParcels/MyParcels";
import Payment from "../Page/Dashboard/Payment/Payment";
import PaymentSuccess from "../Page/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Page/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../Page/Dashboard/Payment History/PaymentHistory";
import ApproveRiders from "../Page/Dashboard/ApproveRiders/ApproveRiders";
import UserManagement from "../Page/Dashboard/User Management/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Page/Dashboard/Assign Riders/AssignRiders";

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
                loader: () => fetch('/warehouses.json').then(res => res.json()),
                Component: Coverage
            },
            {
                path: 'rider',
                loader: () => fetch('/warehouses.json').then(res => res.json()),

                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
            {
                path: 'sendParcel',
                loader: () => fetch('/warehouses.json').then(res => res.json()),
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
        path: 'dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancel
            },
            {
                path: 'approve-riders',
                // Component: ApproveRiders,
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: 'user-management',
                element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
            },
            {
                path: 'assign-riders',
                element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
            }

        ]
    }

]

)