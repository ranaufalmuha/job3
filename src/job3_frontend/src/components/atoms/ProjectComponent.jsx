import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';

export const ProjectComponent = ({ title, role, link, shortDescription }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className="flex gap-4 items-center">
                {/* details  */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <h3 className='text-lg line-clamp-2' aria-label='Job Title'>{title}</h3>
                        <div className="flex gap-3">
                            <Link to={link} target='_blank' className="flex items-center text-sm gap-1 text-description">
                                <span >{link}</span>
                                <HugeiconsIcon className='w-4' icon={ArrowUpRight01Icon} />
                            </Link>

                            <div className="flex gap-2 flex-wrap">
                                {role?.map((item, index) => (
                                    <span className="text-sm text-description/70 border px-2 rounded-full" key={index}>{item}</span>
                                ))}
                            </div>

                        </div>
                    </div>
                    <p className='text-sm text-description'>{shortDescription}</p>
                </div>
            </div>
        </div>
    )
}
