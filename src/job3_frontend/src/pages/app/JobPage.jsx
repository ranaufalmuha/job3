// pages/app/JobPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import LoadingPage from "../additional/LoadingPage";
import { JobCard } from "../../components/atoms/JobCard";
import { Principal } from "@dfinity/principal";
import { job3_backend } from "./../../../../declarations/job3_backend/index.js";

export const JobPage = () => {
    const [jobs, setJobs] = useState(null);
    const [companyMap, setCompanyMap] = useState({}); // pidText -> company
    const [loading, setLoading] = useState(true);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [err, setErr] = useState("");

    // fetch all jobs
    useEffect(() => {
        let alive = true;

        (async () => {
            setLoading(true);
            setErr("");
            try {
                const res = await job3_backend.getAllJob();
                if (!alive) return;
                if (res?.ok) {
                    setJobs(res.ok);
                } else {
                    setErr(res?.err ? JSON.stringify(res.err) : "Unknown error");
                    setJobs([]);
                }
            } catch (e) {
                if (alive) {
                    setErr(e?.message || String(e));
                    setJobs([]);
                }
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => { alive = false; };
    }, [job3_backend]);

    // resolve companies for unique companyId
    useEffect(() => {
        if (!job3_backend || !Array.isArray(jobs) || !jobs.length) return;
        // cari PID yang belum ada di cache
        const needed = new Set(
            jobs
                .map(j => j?.companyId)
                .map(pidObj => pidObj?.toText?.() ?? pidObj?.toString?.())
                .filter(Boolean)
                .filter(pidText => !(pidText in companyMap))
        );
        if (!needed.size) return;

        let alive = true;
        (async () => {
            setLoadingCompanies(true);
            try {
                const entries = await Promise.all(
                    Array.from(needed).map(async (pidText) => {
                        try {
                            const pid = Principal.fromText(pidText);
                            const res = await job3_backend.getCompanyByPrincipalId(pid);
                            if (res?.ok) return [pidText, res.ok];
                        } catch (_) { }
                        return [pidText, null];
                    })
                );
                if (!alive) return;
                setCompanyMap(prev => {
                    const next = { ...prev };
                    for (const [k, v] of entries) next[k] = v;
                    return next;
                });
            } finally {
                if (alive) setLoadingCompanies(false);
            }
        })();

        return () => { alive = false; };
    }, [job3_backend, jobs, companyMap]);

    const headerNote = useMemo(() => {
        if (loadingCompanies) return "Resolving companies…";
        if (jobs?.length) return `${jobs.length} jobs`;
        return "";
    }, [loadingCompanies, jobs]);

    if (loading) return <LoadingPage />;

    return (
        <div className="text-black flex w-full h-full">
            <div className="flex flex-col w-full overflow-auto">
                <div className="pb-8 px-6 flex flex-col gap-1">
                    <h1 className="base-bold text-2xl">Discover your next Web3 journey.</h1>
                    {headerNote && <span className="text-sm opacity-70">{headerNote}</span>}
                    {err && !jobs?.length && (
                        <span className="text-sm text-red-500">Failed to load jobs: {err}</span>
                    )}
                </div>

                {/* Jobs */}
                <section id="jobs" className="flex flex-col pb-24 w-full gap-3 px-6">
                    {jobs?.length ? (
                        jobs.map((j) => {
                            const pidText = j?.companyId?.toText?.() ?? j?.companyId?.toString?.();
                            const company = pidText ? companyMap[pidText] : null;
                            return (
                                <JobCard
                                    key={j.jobId?.toString?.() ?? `${j.title}-${Math.random()}`}
                                    job={j}
                                    company={company}
                                />
                            );
                        })
                    ) : (
                        <div className="text-description">No jobs posted yet.</div>
                    )}
                </section>
            </div>
        </div>
    );
};
