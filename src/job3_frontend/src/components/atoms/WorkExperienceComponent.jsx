import React from 'react';
import { typeClass } from '../../utils/frontend';

export const WorkExperienceComponent = ({
    companyProfilePicture = "/logo/loading.png",
    companyName = "Company",
    jobTitle = "",
    startDate = "",        // label siap tampil, contoh: "April 2020"
    endDate = "",          // label siap tampil, contoh: "July 2022" / "Present"
    responsibilities = "",
    contributions = "",    // employment type
}) => {
    const range = startDate ? `${startDate} - ${endDate || 'Present'}` : '';

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <img
                    src={companyProfilePicture}
                    className="w-12 h-12 aspect-square border object-cover rounded-lg"
                    width="48"
                    height="48"
                    alt={`${companyName} Logo`}
                />
                <div>
                    <h3 className="text-lg line-clamp-2" aria-label="Job Title">
                        {jobTitle || '—'}
                    </h3>
                    <span className="block text-sm text-description">{companyName}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
                {contributions ? (
                    <div className={`px-4 py-1 rounded-full text-xs base-bold ${typeClass(contributions)}`}>
                        {contributions}
                    </div>
                ) : null}
                {range ? <span className="text-xs text-description">{range}</span> : null}
            </div>
        </div>
    );
};
