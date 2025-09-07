// pages/company/ViewCompanyProfile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import LoadingPage from "../additional/LoadingPage";
import { fromOpt } from "../../utils/candidOpt";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyJobs } from "./CompanyJobs";
import { CompanyCulture } from "./CompanyCulture";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Linkedin02Icon,
    NewTwitterIcon,
    TelegramIcon,
    DiscordIcon,
    Github01Icon,
    Link02Icon,
} from "@hugeicons/core-free-icons";
import { Principal } from "@dfinity/principal";
import { job3_backend } from "./../../../../declarations/job3_backend/index.js";


const normalizeUrl = (u) => (!u ? "" : /^https?:\/\//i.test(u) ? u : `https://${u}`);

export const ViewCompanyProfile = () => {
    const { companyId, id } = useParams(); // dukung route /companies/:companyId atau :id
    const pidText = companyId || id;

    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [error, setError] = useState(null);

    // URL tab sync
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || "about";
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const q = searchParams.get("tab");
        if ((q || "about") !== activeTab) setActiveTab(q || "about");
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

    // Fetch company via public canister (no auth)
    useEffect(() => {
        let alive = true;
        (async () => {
            if (!pidText) { setError("Missing company id"); setLoadingCompany(false); return; }
            setLoadingCompany(true);
            setError(null);
            try {
                const pid = Principal.fromText(pidText);
                const res = await job3_backend.getCompanyByPrincipalId(pid);
                if (!alive) return;
                if (res?.ok) {
                    setCompany(res.ok);
                } else if (res?.err) {
                    setError(typeof res.err === "string" ? res.err : JSON.stringify(res.err));
                } else {
                    setError("Unexpected response shape");
                }
            } catch (e) {
                if (!alive) return;
                setError(e?.message || String(e));
            } finally {
                if (alive) setLoadingCompany(false);
            }
        })();
        return () => { alive = false; };
    }, [pidText]);

    // tabs read-only
    const tabs = useMemo(
        () => [
            { key: "about", label: "About", component: <CompanyAbout company={company} readOnly /> },
            { key: "culture", label: "Life and Culture", component: <CompanyCulture company={company} readOnly /> },
            { key: "jobs", label: "Jobs", component: <CompanyJobs company={company} companyId={company?.companyId} readOnly /> },
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

    const social = fromOpt(company?.social, null);
    const linkedIn = social ? fromOpt(social.linkedIn, "") : "";
    const x = social ? fromOpt(social.x, "") : "";
    const telegram = social ? fromOpt(social.telegram, "") : "";
    const discord = social ? fromOpt(social.discord, "") : "";
    const github = social ? fromOpt(social.github, "") : "";
    const other = social ? fromOpt(social.other, "") : "";

    const CompanyHeader = () => {
        const stars = 4;
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={fromOpt(company?.companyLogo, "/logo/loading.png")}
                        className="w-20 h-20 aspect-square object-cover rounded-md"
                        alt="Company logo"
                    />
                    {/* NO edit button in read-only */}
                </div>

                <h1 className="text-3xl font-bold">{company?.companyName || ""}</h1>

                <div className="flex gap-4 text-headlines items-center">
                    {linkedIn && (
                        <a href={normalizeUrl(linkedIn)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Linkedin02Icon} />
                        </a>
                    )}
                    {x && (
                        <a href={normalizeUrl(x)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={NewTwitterIcon} />
                        </a>
                    )}
                    {telegram && (
                        <a href={normalizeUrl(telegram)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={TelegramIcon} />
                        </a>
                    )}
                    {discord && (
                        <a href={normalizeUrl(discord)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={DiscordIcon} />
                        </a>
                    )}
                    {github && (
                        <a href={normalizeUrl(github)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Github01Icon} />
                        </a>
                    )}
                    {other && (
                        <a href={normalizeUrl(other)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Link02Icon} />
                        </a>
                    )}
                </div>

                {/* Tabs */}
                <nav className="text-xl flex gap-6 border-b-2">
                    {tabs.map((t) => {
                        const isActive = t.key === active.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`py-3 border-b-4 transition-colors ${isActive ? "text-highlight border-highlight" : "text-black border-transparent hover:text-highlight"
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
                <div key={active.key}>{active.component}</div>
            </div>
        </div>
    );
};
