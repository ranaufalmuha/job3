import React from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon } from '@hugeicons/core-free-icons';
import { BackgroundBlur } from '../../atoms/BackgroundBlur';

export const Section2 = () => {
    const listContents = [
        {
            linkHref: "/",
            imgUrl: "/images/landing1.webp",
            title: "Browse Jobs",
            description: [
                {
                    text: "Open an account and earn up to",
                    isBold: false,
                },
                {
                    text: "16% annually",
                    isBold: true,
                },
                {
                    text: "on your digital assets.",
                    isBold: false,

                },
            ]
        },
        {
            linkHref: "/",
            imgUrl: "/images/landing1.webp",
            title: "Hire Talent",
            description: [
                {
                    text: "Exchange",
                    isBold: false,

                },
                {
                    text: "100 assets",
                    isBold: true,
                },
                {
                    text: "and unlock liquidity with a crypto-backed Credit Line.",
                    isBold: false,

                },
            ]
        },
        {
            linkHref: "/",
            imgUrl: "/images/landing1.webp",
            title: "Discover Influencer",
            description: [
                {
                    text: "Spend without selling your digital assets and get up to",
                    isBold: false,
                },
                {
                    text: "2% cashback",
                    isBold: true,
                },
                {
                    text: "with the Nexo Card.",
                    isBold: false,

                },
            ]
        }
    ]
    return (
        <section className='px-8 pb-24 pt-48 flex justify-center duration-300'>
            <div className="container duration-300 flex flex-col gap-20">
                <h2 className='text-5xl max-w-[800px] max-lg:text-3xl duration-300'>Build your portfolio from a single app, designed for the forward-thinking investor.</h2>

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
                                <img src={items.imgUrl} className='absolute w-full h-full top-0 left-0 object-cover group-hover:scale-110 duration-300' alt={items.title} draggable={false} />
                            </Link>
                            <p className='text-description text-xl max-lg:text-lg'>
                                {items.description.map((desc) => (
                                    <span className={`${desc.isBold ? "text-headlines base-bold" : ""}`}>
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
