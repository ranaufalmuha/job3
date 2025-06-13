import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, QrCodeIcon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';

export const LandingSection1 = () => {
    return (
        <section className='w-full h-screen text-white p-2'>
            <div className="bg-headlines w-full h-full rounded-xl px-8 py-14 flex justify-center relative overflow-hidden">
                <div className="container flex flex-col justify-between max-md:items-center z-10 duration-300">
                    {/* top  */}
                    <div className=""></div>

                    {/* mid  */}
                    <div className="flex flex-col gap-8 duration-300 max-md:items-center">
                        <h1 className='text-6xl/tight max-w-[700px] max-md:text-center duration-300'>Building Your Dream Team</h1>
                        <p className='text-xl max-md:text-center duration-300'>Finding perfect talent and Influencer for your Web3 projects</p>

                        {/* Actions  */}
                        <div className="flex flex-col max-w-[400px] gap-4">
                            <div className="grid grid-cols-5 gap-4">
                                <Link to={"/login"} className="col-span-4 w-full bg-highlight flex p-4 rounded-lg text-xl items-center justify-between">
                                    <p>Sign up</p>
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} />

                                </Link>
                                <button className="border border-white/20 p-2 rounded-lg justify-center items-center flex aspect-square backdrop-blur-sm bg-headlines/10">
                                    <HugeiconsIcon icon={QrCodeIcon} className='w-9 h-9' />
                                </button>
                            </div>
                            <button className="col-span-5 w-full flex p-4 relative overflow-hidden border border-white/20 text-start text-sm rounded-lg backdrop-blur-sm bg-headlines/10">
                                <p >Unlock your career with job 3, more than <span className='base-bold'>$1,000,000</span> job available. <span className='text-textHighlight'>Discover Job3 Membership {"->"}</span></p>
                            </button>
                        </div>
                    </div>


                    {/* Bot  */}
                    <div className=""></div>
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
                <img src="/images/landing/landing1.webp" className='w-full h-full absolute top-0 left-0 object-cover opacity-70' alt="" />
                <div className="bg-gradient-to-t from-headlines via-transparent to-headlines opacity-40 w-full h-full absolute top-0 left-0"></div>
            </div>
        </section>
    )
}
