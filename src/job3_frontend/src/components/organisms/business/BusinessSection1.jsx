import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, QrCodeIcon } from '@hugeicons/core-free-icons';

export const BusinessSection1 = () => {
    return (
        <section className='w-full md:h-screen text-white p-2 max-md:pt-24 flex flex-col max-md:gap-12'>
            {/* top  */}
            <div className="w-full md:h-[45%] duration-300 flex justify-center items-center text-black">
                <div className="w-[1300px] flex max-md:flex-col gap-12 max-md:gap-8 duration-300 max-md:items-center px-8 pt-8">

                    <div className="w-[60%] max-md:w-full">
                        <h1 className='text-6xl max-xl:text-5xl max-md:text-4xl duration-300'>Build your dream team and accelerate your project</h1>
                    </div>

                    {/* Actions  */}
                    <div className="flex flex-col w-[40%] gap-8 max-md:w-full">
                        <p className='text-xl max-xl:text-lg duration-300 text-description'>Connect with top Web3 talent and KOLs—streamline collaboration, manage engagements end-to-end, and accelerate innovation.</p>
                        <div className="flex flex-col max-w-[400px] gap-4">
                            <div className="grid grid-cols-5 gap-4">
                                <button className="col-span-4 w-full bg-headlines text-white flex p-4 rounded-lg text-xl max-xl:text-lg items-center justify-between hover:bg-headlines/80 duration-300">
                                    <p>Sign up</p>
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} />

                                </button>
                                <button className=" border border-white/20 p-2 rounded-lg justify-center items-center flex aspect-square backdrop-blur-sm bg-headlines/10">
                                    <HugeiconsIcon icon={QrCodeIcon} className='w-9 h-9' />
                                </button>
                            </div>
                            <div className="col-span-5 w-full flex relative overflow-hidden text-start text-sm text-description">
                                <p >Unlock your career with job 3, more than <span className='base-bold text-headlines'>$1,000,000</span> job available. <a href={""} className='text-highlight'>Discover Job3 Membership {"->"}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom  */}
            <div className="bg-headlines w-full md:h-[55%] max-md:aspect-video rounded-xl px-8 py-14 flex justify-center relative overflow-hidden">
                <div className="container flex flex-col justify-end max-md:items-center z-10 max-md:hidden duration-300">

                    {/* Bot  */}
                    {/* <div className="flex justify-center gap-24 max-md:gap-10 duration-300">
                        <div className="flex flex-col items-center">
                            <label>Operating</label>
                            <p className='base-bold'>Since 2025</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <label>Personalized</label>
                            <p className='base-bold'>client care 24/7</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <label>Total Jobs Value</label>
                            <p className='base-bold'>$1+ Million</p>
                        </div>
                    </div> */}

                </div>
                <img src="/images/business/section1.png" className='w-full h-full absolute top-0 left-0 object-cover opacity-90' alt="" />
                <div className="bg-gradient-to-t from-headlines via-transparent to-headlines opacity-40 w-full h-full absolute top-0 left-0"></div>
            </div>
        </section>
    )
}
