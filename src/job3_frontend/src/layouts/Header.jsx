import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
    return (
        <header className={`fixed z-50 px-10 py-4 w-full ${isScrolled ? 'bg-white text-headlines' : 'text-white'} duration-300 flex items-center justify-between `}>
            {/* logo  */}
            <div className="flex items-center gap-2">
                <img src="./logo/icon.svg" className={`h-8 ${isScrolled ? "" : ""}`} alt="" />
                <label className='text-2xl'>Job3</label>
            </div>

            {/* Links  */}
            <ul className='flex gap-6 duration-300'>
                <li className='hover:scale-105 duration-300'>
                    <a href="" >About Us</a>
                </li>
                <li className='hover:scale-105 duration-300'>
                    <a href="" >Careers</a>
                </li>
                <li className='hover:scale-105 duration-300'>
                    <a href="" >Business</a>
                </li>
            </ul>

            {/* navigation  */}
            <nav className="">
                <Link to={"/login"} className={` text-white px-6 py-3 rounded-lg ${isScrolled ? "bg-headlines" : "bg-highlight"} duration-300`}>Authentication</Link>
            </nav>
        </header>
    )
}
