import React, { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons';

export const LandingSection8 = () => {
    const listContents = [
        {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.",
        }, {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.",
        }, {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ratione dolor vel beatae modi laborum qui necessitatibus reprehenderit magni a.",
        },
    ]

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleIndex = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20 rounded-xl">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12">
                    <h2 className='text-5xl max-lg:text-3xl duration-300'>Frequently asked questions.</h2>
                    <div className=" flex flex-col gap-8">
                        {listContents.map((item, index) => (
                            <div key={index} className="border-b pb-6 flex w-full gap-4 group hover:cursor-pointer" onClick={() => toggleIndex(index)}>
                                {/* text  */}
                                <div className="flex flex-col">
                                    <label className='text-2xl'>{item.question}</label>
                                    <p
                                        className={`text-description overflow-hidden transition-all duration-300 pt-4 ease-in-out ${activeIndex === index ? 'max-h-72' : 'max-h-0'}`}
                                    >
                                        {item.answer}
                                    </p>
                                </div>
                                {/* icon  */}
                                <HugeiconsIcon icon={Add01Icon} className={`w-24 ${activeIndex === index ? 'rotate-45' : ''} duration-300`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
