import { createBrowserRouter } from 'react-router-dom';

// Import route segments


// Import Layouts
import { MainLayout } from '../layouts/MainLayout';
import HomeRoutes from './HomeRoutes';
import { LoginPage } from '../pages/LoginPage';


const MainRoutes = createBrowserRouter([
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
    // status page
    // {
    //     path: "/404",
    //     element: <NotFound404 />
    // },
]);

export default MainRoutes;
