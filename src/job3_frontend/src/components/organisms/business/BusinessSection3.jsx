import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { ButtonBlur } from '../../atoms/ButtonBlur';
import { TitleH2 } from '../../atoms/TitleH2';
export const BusinessSection3 = () => {
    return (
        <section className='w-full px-8 pt-48 max-md:pt-24 flex justify-center'>
            {/* top  */}
            <div className="w-[1300px] duration-300 flex flex-col gap-20 rounded-xl">

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
                    <TitleH2 text={"We go the extra mile to stay compliant"} />
                    <div className=" flex flex-col gap-6">
                        <p className='text-xl max-lg:text-lg duration-300 text-description'>Our experienced legal counsel proactively engages with regulatory decision-makers to ensure Nexo secures compliance with applicable frameworks. Through our licenses, we ensure our products will bring value to your business for years to come.</p>
                        <div >
                            <ButtonBlur className='p-4 rounded-lg hover:bg-black hover:text-white' items={
                                <div className="flex gap-8">
                                    <span>Read more</span>
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} className='w-6 h-6' />
                                </div>
                            } />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
