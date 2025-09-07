import React from 'react'

export const CompanySection1 = () => {
    return (
        <section className='w-full text-white p-4 flex flex-col max-md:gap-12'>
            {/* top  */}
            <div className="w-full md:h-[45%] duration-300 flex justify-center items-center text-black">
                <div className="w-[1300px] flex max-md:flex-col gap-12 max-md:gap-4 duration-300 items-center pt-8">

                    <div className="w-[60%] max-md:w-full">
                        <h1 className='text-6xl/tight max-xl:text-5xl/tight max-md:text-4xl/tight duration-300'>Explore companies</h1>
                    </div>

                    {/* Actions  */}
                    <div className="w-[40%] max-md:w-full">
                        <p className='text-xl max-xl:text-lg duration-300 text-description'>Learn about new jobs, reviews, company culture, perks and benefits.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
