// components/atoms/JobCard.jsx
import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Money01Icon, Location10Icon, WorkIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { timeAgoFromNs } from "../../utils/dates";
import { fromOpt } from "../../utils/candidOpt";

// Helpers untuk Candid
const variantLabel = (v, fallback = "-") =>
    v && typeof v === "object" ? Object.keys(v)[0] || fallback : fallback;
const optVal = (opt, fb = null) => (Array.isArray(opt) && opt.length ? opt[0] : fb);

const formatSalary = (optSalary) => {
    const s = optVal(optSalary, null);
    if (!s) return "-";
    const min = optVal(s.min, null);
    const max = optVal(s.max, null);
    const cur = optVal(s.currency, "");
    const pp = [];
    if (min !== null) pp.push(`${cur}${min.toString()}`);
    if (max !== null) pp.push(`${cur}${max.toString()}`);
    return pp.length ? pp.join(" – ") : cur || "-";
};

export const JobCard = ({ job, company }) => {
    if (!job) return null;

    const companyName = company?.companyName || "Unknown Company";
    const companyLogo = fromOpt(company?.companyLogo, "/logo/loading.png");
    const location = company?.location || "—";
    const arrangement = variantLabel(job.arrangement);
    const salary = formatSalary(job.salary);
    const jobType = variantLabel(job.jobType);
    const idStr = job.jobId?.toString?.() ?? "";
    const href = `/jobs/${company?.companyId}/${idStr}`;

    return (
        <Link to={href} className="w-full border border-description/10 rounded-lg">
            <div className="flex gap-4 duration-300 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:bg-black/10 before:w-0 hover:before:w-full before:transition-width before:duration-300 overflow-hidden group hover:cursor-pointer p-6">
                {/* image */}
                <img
                    src={companyLogo}
                    className="w-14 h-14 aspect-square object-cover rounded-lg"
                    alt={companyName}
                />

                {/* content */}
                <div className="flex flex-col w-full gap-1">
                    <h2 className="base-bold text-lg line-clamp-2">{job.title}</h2>
                    <span className="pb-1">{companyName}</span>

                    <div className="flex gap-2 text-description text-sm flex-wrap">
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={WorkIcon} className="h-5" />
                            <span>{arrangement}</span>
                        </div>
                        <span>|</span>
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={Location10Icon} className="h-5" />
                            <span>{location}</span>
                        </div>
                        <span>|</span>
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={Money01Icon} className="h-5" />
                            <span>{salary}</span>
                        </div>
                        <span>|</span>
                        <span className="opacity-70">{jobType}</span>
                        <span>•</span>
                        <span className="opacity-70">{timeAgoFromNs(job.createdAtNs)}</span>
                    </div>

                    <p className="text-description line-clamp-2">{job.description}</p>
                </div>
            </div>
        </Link>
    );
};
