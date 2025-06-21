import React from 'react'
import { Outlet } from 'react-router-dom';
import { JobSidebar } from './JobSidebar';

export const JobLayout = () => {
    return (
        <div className="flex justify-center w-screen h-screen overflow-hidden px-8">

            <div className='max-w-[1300px] w-full flex pt-24 pl-2 duration-300'>
                <div className="w-full min-w-[220px] max-w-[280px] flex overflow-auto py-b max-md:hidden duration-300">
                    <JobSidebar />
                </div>
                <div className="w-full duration-300">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
