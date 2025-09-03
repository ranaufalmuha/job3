import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router-dom';

export const UrlComponent = ({ icon, url = "-" }) => {
    return (
        <div className='flex gap-2 items-center'>
            <div className="text-description">
                <HugeiconsIcon icon={icon} />
            </div>
            {url !== "-" ? (
                <Link to={url} target='_blank' className="">
                    {url}
                </Link>
            ) : (
                <div className="">{url}</div>
            )}
        </div>
    )
}
