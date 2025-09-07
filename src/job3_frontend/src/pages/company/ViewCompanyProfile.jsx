// pages/company/CompanyProfilePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Principal } from "@dfinity/principal";
import LoadingPage from "../additional/LoadingPage";
import { fromOpt } from "../../utils/candidOpt";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyJobs } from "./CompanyJobs";
import { CompanyCulture } from "./CompanyCulture";

// ---------- Tab Content Components ----------

// ---------- Main Page ----------
export const ViewCompanyProfile = () => {
    const { authenticatedActor, principal } = useAuth();
    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [error, setError] = useState(null);

    // URL tab sync
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || "about";
    const [activeTab, setActiveTab] = useState(initialTab);

    // keep URL ↔ state in sync
    useEffect(() => {
        const q = searchParams.get("tab");
        if ((q || "about") !== activeTab) {
            // Jika user mengubah URL manually, sinkronkan state
            setActiveTab(q || "about");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const setTab = (tab) => {
        setActiveTab(tab);
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", tab);
            return next;
        }, { replace: true });
    };

    useEffect(() => {
        if (!authenticatedActor || !principal) return;

        let cancelled = false;
        (async () => {
            setLoadingCompany(true);
            setError(null);
            try {
                const pid =
                    typeof principal === "string"
                        ? Principal.fromText(principal)
                        : principal;

                const res = await authenticatedActor.getCompanyByPrincipalId(pid);
                if (cancelled) return;

                if (res && "ok" in res) {
                    console.log(res.ok);
                    setCompany(res.ok);
                } else if (res && "err" in res) {
                    if (res.err?.NotFound !== undefined) {
                        setCompany(null);
                    } else {
                        setError(JSON.stringify(res.err));
                    }
                } else {
                    setError("Unexpected response shape");
                }
            } catch (e) {
                if (!cancelled) setError(e?.message || String(e));
            } finally {
                if (!cancelled) setLoadingCompany(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [authenticatedActor, principal]);

    // tabs definition (tanpa route)
    const tabs = useMemo(
        () => [
            { key: "about", label: "About", component: <CompanyAbout company={company} onUpdated={(c) => setCompany(c)} /> },
            { key: "culture", label: "Life and Culture", component: <CompanyCulture company={company} onUpdated={(c) => setCompany(c)} /> },
            { key: "jobs", label: "Jobs", component: <CompanyJobs companyId={company?.companyId} company={company} /> },
            // { key: "settings", label: "Settings", component: <SettingsTab /> },
        ],
        [company]
    );

    if (loadingCompany) return <LoadingPage />;
    if (error) {
        return (
            <div className="px-12 py-28 flex justify-center">
                <div className="max-w-[1000px] w-full text-red-400">
                    <p className="font-mono text-sm">Failed to load company: {error}</p>
                </div>
            </div>
        );
    }

    const active = tabs.find((t) => t.key === activeTab) || tabs[0];

    const CompanyHeader = () => {
        const stars = 4;
        return (
            <div className="flex flex-col gap-4">
                <img
                    src={fromOpt(company?.companyLogo, "/logo/loading.png")}
                    className="w-16 h-16 aspect-square object-cover rounded-md"
                    alt="Company logo"
                />
                <h1 className="text-3xl font-bold">{company?.companyName || ""}</h1>

                <div className="flex gap-1 text-headlines items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <img
                            key={i}
                            src="/assets/star.png"
                            className={`w-6 h-6 object-contain ${i >= stars ? "opacity-40" : ""}`}
                            alt="star"
                        />
                    ))}
                    <span className="text-lg">({stars}) total rating from 67 reviews</span>
                </div>

                {/* Tabs (local, no route) */}
                <nav className="text-xl flex gap-6 border-b-2">
                    {tabs.map((t) => {
                        const isActive = t.key === active.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`py-3 border-b-4 transition-colors ${isActive
                                    ? "text-highlight border-highlight"
                                    : "text-black border-transparent hover:text-highlight"
                                    }`}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        );
    };

    return (
        <div className="px-12 py-28 flex justify-center">
            <div className="max-w-[1000px] w-full flex flex-col gap-8">
                <CompanyHeader />
                {/* Render komponen tab aktif */}
                <div key={active.key}>{active.component}</div>
            </div>
        </div>
    );
};
