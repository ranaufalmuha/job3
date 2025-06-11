import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function isHeaderDark() {
        if (isScrolled || location.pathname !== "/") {
            return true;
        } else {
            return false
        }
    }

    return (
        <header className={`fixed z-50 w-full p-2 pb-0`}>
            <div className={`px-10 py-4 w-full rounded-xl ${isHeaderDark() ? ' text-headlines backdrop-blur-xl bg-white/80' : 'text-white'} justify-between  items-center flex duration-100 transition-all`}>

                {/* logo  */}
                <Link to={"/"} className="flex items-center gap-2 hover:cursor-pointer">
                    <img src="./logo/icon.svg" className={`h-6 ${isHeaderDark() ? "" : ""}`} alt="" />
                    <label className='text-2xl'>Job3</label>
                </Link>

                {/* Links  */}
                <ul className='flex gap-6 duration-300'>
                    <li className='hover:scale-105 duration-300'>
                        <a href="" >About Us</a>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <a href="" >Careers</a>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <a href="/business" >Business</a>
                    </li>
                </ul>

                {/* navigation  */}
                <nav className="flex gap-4 items-center">
                    <Link to={"/login"} className={`rounded-lg duration-300 px-2 ${isHeaderDark() ? "text-headlines" : "text-white"}`}>Log in</Link>
                    <Link to={"/login"} className={` text-white px-6 py-2 rounded-lg bg-highlight duration-300`}>Sign up</Link>
                </nav>
            </div>
        </header>
    )
}
