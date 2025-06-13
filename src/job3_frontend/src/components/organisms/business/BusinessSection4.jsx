import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, QrCodeIcon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';
import { TitleH2 } from '../../atoms/TitleH2';

export const BusinessSection4 = () => {
    return (
        <section className='px-8 pt-48 max-md:pt-24 flex justify-center duration-300'>
            <div className="max-w-[2400px] w-full relative overflow-hidden flex justify-center rounded-xl group px-14 py-28 max-md:px-8 max-md:py-24 bg-headlines">
                <div className="container duration-300 flex flex-col gap-8 max-lg:gap-4 text-white  justify-center">
                    <TitleH2 text={"Ready to get started?"} className="max-w-[600px] z-10" />

                    <p className='text-lg max-lg:text-base duration-300 z-10 max-w-[600px]'>Open a Nexo corporate account in just a few minutes. Simply provide your business information, complete our quick identity verification, and start using your account.</p>
                    <div className="h-24"></div>
                    <div className='z-10'>
                        <div className="grid grid-cols-5 gap-4 flex-col max-w-[400px]">
                            <Link to={"/login"} className="hover:bg-highlight/80 duration-300 col-span-4 w-full bg-highlight flex p-4 rounded-lg text-xl items-center justify-between">
                                <p>Sign up</p>
                                <HugeiconsIcon icon={ArrowUpRight01Icon} />

                            </Link>
                            <button className="border border-white/20 p-2 rounded-lg justify-center items-center flex aspect-square backdrop-blur-sm bg-headlines/10 hover:opacity-80 duration-300">
                                <HugeiconsIcon icon={QrCodeIcon} className='w-9 h-9' />
                            </button>
                        </div>
                    </div>
                </div>
                <img src="/images/business/section1.webp" className='top-0 left-0 absolute object-cover opacity-50 w-full h-full group-hover:scale-110 duration-300' alt="" />
            </div>
        </section>
    )
}
