import React from 'react'
import { fromOpt, variantLabel } from '../../../utils/candidOpt'
import { timeAgoFromNs } from '../../../utils/dates'
import { typeClass } from '../../../utils/frontend'
import { Link } from 'react-router-dom';

export const JobCardComponent = ({ company, item }) => {
    if (!item) return null; // guard

    const logo = fromOpt(company?.companyLogo, "./logo/loading.png");
    const companyName = company?.companyName || "-";

    const jtLabel = variantLabel(item.jobType) || "-";

    return (
        <Link to={`/jobs/${company.companyId}/${item.jobId}`} className="border aspect-square rounded-xl p-4 flex flex-col gap-1 justify-between">
            <div className="flex flex-col">
                <div className="h-12">
                    <img
                        src={logo}
                        className="h-full object-contain"
                        alt={companyName}
                    />
                </div>

                <div className="flex flex-col">
                    <p className="line-clamp-2">{item.title ?? ""}</p>
                    <span className="text-base line-clamp-1">{companyName}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex">
                    <div className={`px-4 py-1 rounded-full text-xs base-bold ${typeClass(jtLabel)}`}>
                        {jtLabel}
                    </div>
                </div>
                <span className="text-sm text-description">{timeAgoFromNs(item.createdAtNs)}</span>
            </div>
        </Link>
    );
};
