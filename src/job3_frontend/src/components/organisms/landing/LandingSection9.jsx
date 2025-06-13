import React from 'react'
import { ButtonBlur } from '../../atoms/ButtonBlur'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { TitleH2 } from '../../atoms/TitleH2';

export const LandingSection9 = () => {
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="max-w-[2400px] w-full relative overflow-hidden flex justify-center rounded-xl group px-14 py-28 bg-headlines">
                <div className="container duration-300 flex flex-col gap-8 max-lg:gap-4 text-white justify-center">
                    <TitleH2 text={"Serving clients since 2018."} className={"z-10 max-w-[600px]"} />

                    <p className='text-lg max-lg:text-base duration-300 z-10 max-w-[600px]'>Individuals, businesses, and institutions rely on us to help grow their digital asset portfolios.</p>
                    <div className="h-24"></div>
                    <div className='z-10'>
                        <ButtonBlur className='p-4 rounded-lg hover:bg-white hover:text-black' isDark={true} items={
                            <div className="flex gap-8">
                                <span>Read more</span>
                                <HugeiconsIcon icon={ArrowUpRight01Icon} className='w-6 h-6' />
                            </div>
                        } />
                    </div>
                </div>
                <img src="/images/landing/landing1.webp" className='top-0 left-0 absolute object-cover opacity-50 w-full h-full group-hover:scale-110 duration-300' alt="" />
            </div>
        </section>
    )
}
