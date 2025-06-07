import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarIcon } from '@hugeicons/core-free-icons';

export const LandingSection7 = () => {
    const listContents = [
        {
            stars: 5,
            comment: "I'm planning to move more coins to Nexo because I feel much safer there. Honestly, safer than a cold wallet. I could lose my cold wallet, my apartment could burn down, but Nexo is securing my coins all day long with a highly skilled personnel that is aware of the latest threats.",
        },
        {
            stars: 4,
            comment: "I was able to resolve my query and continue with my busy day at work. This experience gave me peace of mind that if I need assistance again, I am confident in Nexo's professionalism.",
        },
        {
            stars: 2,
            comment: "I was able to resolve my query and continue with my busy day at work. This experience gave me peace of mind that if I need assistance again, I am confident in Nexo's professionalism.",
        },
        {
            stars: 3,
            comment: "I was able to resolve my query and continue with my busy day at work. This experience gave me peace of mind that if I need assistance again, I am confident in Nexo's professionalism.",
        },
        {
            stars: 5,
            comment: "I was able to resolve my query and continue with my busy day at work. This experience gave me peace of mind that if I need assistance again, I am confident in Nexo's professionalism.",
        },
        {
            stars: 5,
            comment: "I recently experienced a personal emergency and reached out to Nexo’s support team for assistance. I was incredibly impressed by their prompt and compassionate response.",
        },
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="container duration-300 flex flex-col gap-20 rounded-xl items-center">
                {/* head  */}
                <div className="w-full">
                    <h2 className='text-5xl max-lg:text-3xl max-md:w-full w-4/5 duration-300'>Our dedicated team is available seven days a week
                        to provide personal assistance.</h2>
                </div>

                {/* content  */}
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8">
                    <label className='hidden'>Comments</label>
                    {listContents.map((item, index) => (
                        <div key={index} className="bg-highlight/10 p-8 rounded-xl flex flex-col justify-between gap-6 hover:scale-105 duration-300">
                            <p className='text-lg max-lg:text-base duration-300 text-description'>{'"' + item.comment + '"'}</p>
                            <div className="flex gap-1 text-headlines">
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <img key={starIndex} src="./assets/star.png" className={`w-6 h-6 object-contain ${starIndex > item.stars ? "opacity-40" : ""}`} alt="" />
                                ))}
                                <span>{"(" + item.stars + ")"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
