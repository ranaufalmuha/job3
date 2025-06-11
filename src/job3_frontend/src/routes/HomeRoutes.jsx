import React from "react";

import { LandingPage } from "../pages/LandingPage";
import { BusinessPage } from "../pages/BusinessPage";

const HomeRoutes = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: "business",
        element: <BusinessPage />,
    },
];

export default HomeRoutes;
