import React from "react";
import { LandingPage } from "../pages/LandingPage";
import { BusinessPage } from "../pages/BusinessPage";
import { JobPage } from "../pages/app/JobPage";
import { JobLayout } from "../layouts/job/JobLayout";
import { JobDetailPage } from "../pages/app/JobDetailPage";
import { CompanyLayout } from "../layouts/company/CompanyLayout";
import { CompanyAbout } from "../pages/company/CompanyAbout";
import { CompanyJobs } from "../pages/company/CompanyJobs";
import { Company } from "../pages/company/Company";
import ProtectedRoute from "../contexts/ProtectedRoute";
import { ProfileGate } from "../pages/ProfileGate";
import { ProfileUserPage } from "../pages/user/ProfileUserPage";
import { CompanyProfilePage } from "../pages/company/CompanyProfilePage";

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
        path: "profile",
        element: (
            <ProtectedRoute>
                <ProfileGate />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "user",
                element: (
                    <ProtectedRoute require="user">
                        <ProfileUserPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "company",
                element: (
                    <ProtectedRoute require="company">
                        <CompanyProfilePage />
                    </ProtectedRoute>
                ),
            },
        ],
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
