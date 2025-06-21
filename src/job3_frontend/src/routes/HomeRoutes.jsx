import React from "react";
import { LandingPage } from "../pages/LandingPage";
import { BusinessPage } from "../pages/BusinessPage";
import { JobPage } from "../pages/app/JobPage";
import { JobLayout } from "../layouts/job/JobLayout";

const HomeRoutes = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: "business",
        element: <BusinessPage />,
    },
    {
        path: "jobs",
        element: <JobLayout />,
        children: [
            {
                index: true,
                element: <JobPage />
            },
        ]
    },
];

export default HomeRoutes;
