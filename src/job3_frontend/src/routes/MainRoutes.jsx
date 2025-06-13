import { createBrowserRouter } from 'react-router-dom';

// Import route segments
import HomeRoutes from './HomeRoutes';

// Import Layouts
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';


export const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...HomeRoutes,
        ]
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