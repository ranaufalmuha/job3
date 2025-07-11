import React from 'react'
import { ButtonBlur } from '../../atoms/ButtonBlur'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { TitleH2 } from '../../atoms/TitleH2';

export const LandingSection5 = () => {
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-8 max-lg:gap-4 bg-headlines text-white rounded-xl px-14 py-28 relative overflow-hidden justify-center group">
                <TitleH2 text={"Start your Web3 journey"} className={"z-10 max-w-[600px]"} />


                <p className='text-lg max-lg:text-base duration-300 z-10 max-w-[600px]'>Individuals, businesses, and institutions rely on us to help grow their digital asset portfolios.</p>
                <div className='z-10'>
                    <ButtonBlur className='p-4 rounded-lg hover:bg-white hover:text-black' isDark={true} items={
                        <div className="flex gap-8">
                            <span>Browse Jobs</span>
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className='w-6 h-6' />
                        </div>
                    } />
                </div>
                <img src="/images/landing/landing5.webp" className='top-0 left-0 absolute object-cover opacity-50 w-full h-full group-hover:scale-110 duration-300' alt="" />
            </div>
        </section>
    )
}
