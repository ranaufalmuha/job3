import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fromOpt } from "../../utils/candidOpt";
import { timeAgoFromNs } from "../../utils/dates";
import { job3_backend } from "./../../../../declarations/job3_backend/index.js";

// helpers
const variantLabel = (v, fb = "-") =>
    v && typeof v === "object" ? Object.keys(v)[0] || fb : fb;
const optVal = (opt, fb = null) =>
    Array.isArray(opt) && opt.length ? opt[0] : fb;
const formatSalary = (optSalary) => {
    const s = optVal(optSalary, null);
    if (!s) return "-";
    const min = optVal(s.min, null);
    const max = optVal(s.max, null);
    const cur = optVal(s.currency, "");
    const pp = [];
    if (min !== null) pp.push(`${cur}${min.toString()}`);
    if (max !== null) pp.push(`${cur}${max.toString()}`);
    return pp.length ? pp.join(" - ") : cur || "-";
};
const slugify = (t) =>
    (t || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const JobDetailPage = () => {
    const { id: idParam } = useParams(); // /jobs/:company_name/:id

    const [job, setJob] = useState(null);
    const [company, setCompany] = useState(null);

    // fetch job
    useEffect(() => {
        if (!job3_backend || !idParam) return;
        let alive = true;
        (async () => {
            try {
                const jobId = BigInt(idParam);
                const res = await job3_backend.getJobById(jobId);
                if (!alive) return;
                if (res?.ok) setJob(res.ok);
            } catch { }
        })();
        return () => { alive = false; };
    }, [job3_backend, idParam]);

    // fetch company
    useEffect(() => {
        if (!job3_backend || !job?.companyId) return;
        let alive = true;
        (async () => {
            try {
                const res = await job3_backend.getCompanyByPrincipalId(job.companyId);
                if (!alive) return;
                if (res?.ok) setCompany(res.ok);
            } catch { }
        })();
        return () => { alive = false; };
    }, [job3_backend, job]);

    // derived display
    const companyName = company?.companyName || "-";
    const companyLogo = fromOpt(company?.companyLogo, "/logo/loading.png");
    const companyHref = `/companies/${company?.companyId}`;

    const title = job?.title || "Full-Time Software Engineer";
    const arrangement = useMemo(() => variantLabel(job?.arrangement, "Remote"), [job]);
    const jobType = useMemo(() => variantLabel(job?.jobType, "Full-Time"), [job]);
    const payType = useMemo(() => variantLabel(job?.payTypes, "-"), [job]);
    const experience = job?.experience || "-";
    const location = company?.location || "Indonesia";
    const salary = formatSalary(job?.salary);
    const posted = job?.createdAtNs ? timeAgoFromNs(job.createdAtNs) : null;
    const verified = optVal(job?.verified, null) === true;
    const hiringSpeed = useMemo(() => {
        const v = optVal(job?.hiringSpeed, null);
        return variantLabel(v, null);
    }, [job]);

    const techStack = Array.isArray(job?.techStack) ? job.techStack : [];
    const ecosystems = optVal(job?.ecosystems, "");

    // description: pakai yang dari backend kalau ada, sisanya pakai placeholder kamu
    const desc = job?.description || ``;

    return (
        <div className="px-6 py-28 flex justify-center text-lg">
            <div className="max-w-[1300px] flex flex-col gap-8 w-full">

                <section className=" flex flex-col gap-4">
                    {/* Header */}
                    <Link to={companyHref} className="flex gap-3 items-center">
                        <img
                            src={companyLogo}
                            className="w-8 h-8 aspect-square object-cover rounded-md"
                            width={"100%"}
                            height={"100%"}
                            alt={companyName}
                        />
                        <span className="line-clamp-1">{companyName}</span>
                    </Link>

                    <h2 className="text-3xl base-bold">{title}</h2>

                    {/* meta ringkas (tanpa ubah gaya, tetap text-description text-sm) */}
                    <div className="flex flex-col gap-2">
                        <span className="text-description text-sm">
                            {location} ({arrangement})
                        </span>
                        <span className="text-description text-sm">{salary}</span>

                        {/* tambahan meta—tetap gaya yang sama */}
                        <span className="text-description text-sm">
                            {jobType} • {payType}{experience ? ` • ${experience}` : ""}{posted ? ` • Posted ${posted}` : ""}
                            {verified ? " • Verified" : ""}
                            {hiringSpeed ? ` • ${hiringSpeed}` : ""}
                        </span>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-highlight text-white py-2 px-6 rounded-md">Apply</button>
                        <button className="text-highlight border border-highlight py-2 px-6 rounded-md">Save</button>
                    </div>
                </section>

                {/* About Job */}
                <section className="flex flex-col gap-4 ">
                    <h3 className="text-xl base-bold">About the Job</h3>

                    {/* deskripsi utama (dari backend atau placeholder-mu) */}
                    <p>{desc}</p>

                    {/* tech stack (jika ada) — gunakan list yang sama dengan gaya kamu */}
                    {techStack.length > 0 && (
                        <>
                            <p><strong className="base-bold">Tech Stack</strong></p>
                            <ul className="list-disc pl-4">
                                {techStack.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </>
                    )}

                    {/* ecosystems (jika ada) */}
                    {ecosystems && (
                        <>
                            <p><strong className="base-bold">Ecosystems</strong></p>
                            <p>{ecosystems}</p>
                        </>
                    )}

                </section>

            </div>
        </div>
    );
};
