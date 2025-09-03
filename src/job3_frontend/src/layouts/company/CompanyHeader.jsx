import React from 'react'
import { Link } from 'react-router-dom'

export const CompanyHeader = () => {

    const items = [
        { label: "About", href: "/company/dfinity/about" },
        { label: "Jobs", href: "/company/dfinity/jobs" },
    ];

    const stars = 4;

    return (
        <div className="flex flex-col gap-4">
            <img src="/logo/dfinity_logo.jpeg" className='w-16 h-16 aspect-square object-cover rounded-md' width={"100%"} height={"100%"} alt="" />
            <h1 className='text-3xl base-bold'>Dfinity</h1>

            <div className="flex gap-1 text-headlines items-center">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img key={starIndex} src="./assets/star.png" className={`w-6 h-6 object-contain ${starIndex >= stars ? "opacity-40" : ""}`} alt="" />
                ))}
                <span className='text-lg'>{"(" + stars + ") total rating from 67 reviews"}</span>
            </div>

            <nav className='text-xl flex gap-6  border-b-2'>
                <Link to={"/company/dfinity/about"} className='py-3 border-b-4 text-highlight border-highlight '>About</Link>
                <Link to={"/company/dfinity/jobs"} className='py-3 '>Jobs</Link>
            </nav>

        </div>
    )
}

