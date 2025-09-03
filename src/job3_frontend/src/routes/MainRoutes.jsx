import { createBrowserRouter } from 'react-router-dom';

// Import route segments
import HomeRoutes from './HomeRoutes';

// Import Layouts
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AuthPage } from '../pages/AuthPage';
import { CreateUserPage } from '../pages/user/CreateUserPage';


export const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...HomeRoutes,
        ]
    },
    {
        path: "/auth",
        element: <AuthPage />
    },
    {
        path: "/create-user",
        element: <CreateUserPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
]);