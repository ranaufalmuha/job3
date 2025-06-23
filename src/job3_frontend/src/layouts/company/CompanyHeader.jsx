import React from 'react'
import { Link } from 'react-router-dom'

export const CompanyHeader = () => {

    const items = [
        { label: "About", href: "/company/dfinity/about" },
        { label: "Jobs", href: "/company/dfinity/jobs" },
    ];

    return (
        <div className="flex flex-col gap-4">
            <img src="/logo/dfinity_logo.jpeg" className='w-16 h-16 aspect-square object-cover rounded-md' width={"100%"} height={"100%"} alt="" />
            <h1 className='text-3xl base-bold'>Dfinity</h1>

            <nav className='text-xl flex gap-6  border-b-2'>
                <Link to={"/company/dfinity/about"} className='py-3 border-b-4 text-highlight border-highlight '>About</Link>
                <Link to={"/company/dfinity/jobs"} className='py-3 '>Jobs</Link>
            </nav>

        </div>
    )
}

