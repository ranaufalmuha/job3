import React from "react";
import { LandingPage } from "../pages/LandingPage";
import { BusinessPage } from "../pages/BusinessPage";
import { JobPage } from "../pages/app/JobPage";
import { JobLayout } from "../layouts/job/JobLayout";
import { JobDetailPage } from "../pages/app/JobDetailPage";
import { CompanyLayout } from "../layouts/company/CompanyLayout";
import { CompanyAbout } from "../pages/app/company/CompanyAbout";
import { CompanyJobs } from "../pages/app/company/CompanyJobs";
import { Company } from "../pages/app/company/Company";

const HomeRoutes = [
    {
        index: true,
        element: <LandingPage />,
    },
    {
        path: "business",
        element: <BusinessPage />,
    },

    // Jobs 
    {
        path: "jobs",
        element: <JobLayout />,
        children: [
            {
                index: true,
                element: <JobPage />
            }
        ]
    },
    {
        path: "/jobs/:company_name/:id",
        element: <JobDetailPage />
    },

    // Company 
    {
        path: "company",
        children: [
            {
                index: true,
                element: <Company />
            },
            {
                path: ":company_name",
                element: <CompanyLayout />,
                children: [
                    {
                        index: true,
                        element: <CompanyAbout />
                    },
                    {
                        path: "about",
                        element: <CompanyAbout />
                    },
                    {
                        path: "jobs",
                        element: <CompanyJobs />
                    }
                ]
            },

        ]
    },
];

export default HomeRoutes;
