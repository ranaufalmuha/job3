import React from 'react'
import { NavLink } from 'react-router-dom'

export const CompanyHeader = () => {

    const items = [
        { label: "About", href: "/profile/company/dfinity/about" },
        { label: "Jobs", href: "/profile/company/dfinity/jobs" },
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

            {/* Tabs */}
            <nav className="text-xl flex gap-6 border-b-2">
                {items.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                            `py-3 border-b-4 transition-colors ${isActive
                                ? "text-highlight border-highlight"
                                : "text-black border-transparent hover:text-highlight"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

        </div>
    )
}

