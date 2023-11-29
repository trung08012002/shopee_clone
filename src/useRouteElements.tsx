import { Navigate, Outlet, useRoutes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginLayout from "./Layouts/LoginLayout/LoginLayout";
import RegisterLayout from "./Layouts/RegisterLayout/RegisterLayout";
import MainLayout from "./Layouts/MainLayout";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AppContext } from "./contexts/app.context";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";



function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
    const routeElements = useRoutes(
        [
            {
                path: '',
                element: <MainLayout><ProductPage /></MainLayout>
            },
            {
                path: ':nameId',
                element: <MainLayout><ProductDetail /></MainLayout>
            },
            {
                path: '',
                element: <ProtectedRoute />,
                children: [{
                    path: 'profile',
                    element: (<MainLayout><Profile /></MainLayout>)
                }]
            },
            {
                path: '',
                element: <RejectedRoute />,
                children: [
                    {
                        path: 'login',
                        element: (
                            <LoginLayout> <Login /></LoginLayout>
                        )
                    },
                    {
                        path: 'register',
                        element: (<RegisterLayout><Register /></RegisterLayout>)
                    }
                ]
            },

        ]
    )
    return routeElements;
};


