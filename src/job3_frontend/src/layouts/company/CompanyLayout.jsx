import React from 'react'
import { Outlet } from 'react-router-dom';
import { CompanyHeader } from './CompanyHeader';

export const CompanyLayout = () => {
    return (
        <div className='px-12 py-28 flex justify-center'>

            <div className="max-w-[1000px] w-full flex flex-col gap-8">

                <CompanyHeader />
                <Outlet />

            </div>

        </div>
    )
}
