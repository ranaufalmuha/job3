import React from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon } from '@hugeicons/core-free-icons';
import { BackgroundBlur } from '../../atoms/BackgroundBlur';
import { TitleH2 } from '../../atoms/TitleH2';

export const LandingSection2 = () => {
    const listContents = [
        {
            linkHref: "/",
            imgUrl: "/images/landing/landing2.webp",
            title: "Publish Job",
            description: [
                {
                    text: "Publish your opening, reach Web3's ",
                    isBold: false,
                },
                {
                    text: "top talent,",
                    isBold: true,
                },
                {
                    text: "and manage applications seamlessly in one dashboard",
                    isBold: false,

                },
            ]
        },
        {
            linkHref: "/",
            imgUrl: "/images/landing/landing3.webp",
            title: "Hire Talent",
            description: [
                {
                    text: "Connect with top-tier",
                    isBold: false,

                },
                {
                    text: "professionals",
                    isBold: true,
                },
                {
                    text: "to join your Web3 team.",
                    isBold: false,

                },
            ]
        },
        {
            linkHref: "/",
            imgUrl: "/images/landing/landing4.webp",
            title: "Discover KOLs",
            description: [
                {
                    text: "Tap into influential KOL networks to ",
                    isBold: false,
                },
                {
                    text: "accelerate your project ",
                    isBold: true,
                },
                {
                    text: "growth.",
                    isBold: false,

                },
            ]
        }
    ]
    return (
        <section className='px-8 pb-24 pt-48 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20">
                <TitleH2 text={"Job3 seamlessly connects your project with the brightest minds in Web3, accelerating your next big breakthrough."} />

                {/* contents  */}
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 duration-300">

                    {listContents.map((items, index) => (
                        <div key={index} className="w-full h-full flex flex-col gap-6 duration-300">
                            <Link to={items.linkHref} className='text-white w-full bg-headlines aspect-[3/4] max-md:aspect-square p-10 rounded-xl flex flex-col relative overflow-hidden group duration-300'>
                                <div className="z-10 flex justify-between items-start gap-4 text-3xl max-lg:text-xl duration-300">
                                    <h3 >{items.title}</h3>
                                    <BackgroundBlur className='p-2 max-lg:p-1 max-lg:w-8 max-lg:h-8  rounded-md group-hover:bg-white group-hover:text-headlines' items={
                                        <HugeiconsIcon icon={PlusSignIcon} />
                                    } />
                                </div>
                                <img src={items.imgUrl} className='absolute w-full h-full top-0 left-0 object-cover group-hover:scale-110 duration-300 opacity-80' alt={items.title} draggable={false} />
                            </Link>
                            <p className='text-description text-xl max-lg:text-lg'>
                                {items.description.map((desc, i) => (
                                    <span key={i} className={`${desc.isBold ? "text-headlines base-bold" : ""}`}>
                                        {" " + desc.text + " "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
