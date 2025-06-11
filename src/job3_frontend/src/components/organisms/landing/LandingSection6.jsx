import React from 'react'

export const LandingSection6 = () => {
    const listContents = [
        {
            imgUrl: "/images/company/INATBA.svg",
            companyName: "Lorem ipsum",
        },
        {
            imgUrl: "/images/company/fintech-breakthrough-2025.webp",
            companyName: "Lorem ipsum",
        },
        {
            imgUrl: "/images/company/forbes.svg",
            companyName: "Lorem ipsum",
        },
        {
            imgUrl: "/images/company/stevie_award.svg",
            companyName: "Lorem ipsum",
        },
        {
            imgUrl: "/images/company/silver-globee.webp",
            companyName: "Lorem ipsum",
        },
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20 rounded-xl items-center">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 w-full">
                    <h2 className='text-5xl max-lg:text-3xl duration-300'>Partner Awards</h2>
                </div>

                {/* content  */}
                <div className="flex flex-wrap gap-8">
                    {listContents.map((item, index) => (
                        <img key={index} src={item.imgUrl} className='w-32 hover:scale-105 duration-300' draggable={false} alt="" />
                    ))}
                </div>
            </div>
        </section>
    )
}
