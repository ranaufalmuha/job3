import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react'
import { Briefcase06Icon } from '@hugeicons/core-free-icons';

export const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuIndex, setMenuIndex] = useState(0);
    const [hoveredMenu, setHoveredMenu] = useState(false);
    const location = useLocation();

    const MENU_LIST = [
        {
            name: "About Us",
            description: "Learn about us...",
            submenu: [
                {
                    title: "About Us",
                    href: "",
                    desc: "Company history..."
                },
                {
                    title: "Team",
                    href: "",
                    desc: "Meet our team..."
                },
                {
                    title: "Careers",
                    href: "",
                    desc: "Join us..."
                }
            ]
        },
        {
            name: "Find Work",
            description: "Find your dream job...",
            submenu: [
                {
                    title: "Job List",
                    href: "jobs",
                    desc: "All available jobs"
                },
                {
                    title: "Company List",
                    href: "company",
                    desc: "All available company"
                }
            ]
        },
        {
            name: "Business",
            description: "Solutions for companies",
            submenu: [
                {
                    title: "Corporate Accounts",
                    href: "business",
                    desc: "For your business"
                },
                {
                    title: "Partnership",
                    href: "business",
                    desc: "Let's work together"
                },
                {
                    title: "Bulk Hiring",
                    href: "business",
                    desc: "Hire fast at scale"
                },
                {
                    title: "Partnership",
                    href: "business",
                    desc: "Let's work together"
                },
                {
                    title: "Bulk Hiring",
                    href: "business",
                    desc: "Hire fast at scale"
                }
            ]
        },
    ]

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHeaderDark = () => isScrolled || location.pathname !== "/";

    function handleMouseLeaveAll() {
        setHoveredMenu(false);
    }

    return (
        <header className={`fixed z-50 w-full p-2 pb-0`}>
            <div className=" w-full relative z-20">
                <div className={` w-full rounded-lg ${isHeaderDark() ? ` text-headlines backdrop-blur-xl ${hoveredMenu ? "bg-white" : "bg-white"}` : `text-white ${hoveredMenu ? "bg-headlines " : ""}`} justify-between  items-center flex flex-col duration-300 transition-all border border-description/10`}>

                    <div className="flex w-full justify-between gap-2 items-center px-10 py-4">
                        {/* logo  */}
                        <Link to={"/"} className="flex items-center gap-2 hover:cursor-pointer">
                            <img src="./logo/icon.svg" className={`h-6 ${isHeaderDark() ? "" : ""}`} alt="" />
                            <span className='text-2xl'>Job3</span>
                        </Link>

                        {/* menu  */}
                        <ul className='flex gap-6 max-md:hidden'>
                            {MENU_LIST.map((menu, idx) => (
                                <li key={idx}
                                    className='duration-300 relative cursor-default'
                                    onMouseEnter={() => {
                                        setMenuIndex(idx);
                                        setHoveredMenu(true);
                                    }}
                                >
                                    {menu.name}
                                </li>
                            ))}
                        </ul>

                        {/* navigation  */}
                        <nav className="flex gap-4 items-center">
                            <div className="flex gap-4 items-center max-md:hidden">
                                <Link to={"/login"} className={`rounded-lg duration-300 px-2 ${isHeaderDark() ? "text-headlines" : "text-white"}`}>Log in</Link>
                                <Link to={"/signup"} className={` text-white px-6 py-2 rounded-lg bg-highlight duration-300`}>Sign up</Link>
                            </div>

                            <button
                                className="relative md:max-w-0 max-w-20 overflow-hidden duration-300"
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                                aria-label="Open mobile menu"
                            >
                                <div className={`relative flex items-center justify-center w-[30px] h-[30px] rounded-full ring-0 ring-gray-300 hover:ring-8 ${isOpenMenu ? "ring-4" : ""} ring-opacity-30 duration-200`}>
                                    <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 ${isOpenMenu ? "-rotate-[45deg]" : ""} origin-center`}>
                                        <span className={`bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 ${isOpenMenu ? "-rotate-90 h-[1px] -translate-y-[1px]" : ""} origin-right delay-75`}></span>
                                        <span className="bg-black h-[1px] rounded"></span>
                                        <span className={`bg-black h-[2px] w-1/2 rounded self-end transform transition-all duration-300 ${isOpenMenu ? "-rotate-90" : ""} ${isOpenMenu ? "h-[1px] translate-y-[1px]" : ""} origin-left delay-75`}></span>
                                    </div>
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* mega dropdown modal */}
                    <div className={`w-full transition-all overflow-hidden duration-300 border border-description/10 ${hoveredMenu ? "opacity-100 translate-y-0 max-h-screen" : "opacity-0 max-h-0 pointer-events-none"} flex justify-center `}>
                        <div className="max-w-[1400px] flex justify-center">

                            {/* Explain  */}
                            <div className="min-w-80  p-10 flex flex-col gap-2">
                                <h2 className='text-xl'>{MENU_LIST[menuIndex].description}</h2>
                                <p className='text-description text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A magnam </p>
                            </div>

                            {/* divider  */}
                            <div className="border-l h-full border-description/10"></div>

                            {/* Navigation  */}
                            <div className="p-6 flex flex-wrap gap-6 ">

                                {/* card  */}
                                {MENU_LIST[menuIndex].submenu.map((item, i) => (
                                    <Link key={i} to={"/" + item.href} onClick={handleMouseLeaveAll} className="flex gap-4 w-80 hover:bg-black/10 p-4 rounded-lg items-start duration-300">
                                        <HugeiconsIcon icon={Briefcase06Icon} className='w-9' />
                                        <div className="flex flex-col gap-1">
                                            <h3 >{item.title}</h3>
                                            <p className='text-sm text-description'>{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className={`bg-black/50 backdrop-blur-lg absolute w-screen h-screen top-0 left-0 z-10 ${!hoveredMenu && "hidden"}`} onMouseEnter={handleMouseLeaveAll}></div>
        </header>
    )
}
