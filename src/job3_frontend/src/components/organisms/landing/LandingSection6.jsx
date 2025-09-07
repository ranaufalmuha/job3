import React from 'react'
import { TitleH2 } from '../../atoms/TitleH2'

export const LandingSection6 = () => {
    const listContents = [
        {
            imgUrl: "https://icoanalytics.org/wp-content/uploads/2022/05/Dfinity-Foundation.png",
            companyName: "Dfinity",
            height: "h-24",
        },
        {
            imgUrl: "https://media.licdn.com/dms/image/v2/D4E12AQHsS6XMqbSpMg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705657521210?e=2147483647&v=beta&t=_nImvcgLjcLEAgInBR-gURyjRLJRxn7C3xbV6WU10mI",
            companyName: "Internet Computer",
            height: "h-14",
        },
    ]
    return (
        <section className='px-8 py-24 flex justify-center duration-300'>
            <div className="w-[1300px] duration-300 flex flex-col gap-20 rounded-xl items-center">
                {/* head  */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 w-full">
                    <TitleH2 text={"Partner"} />

                </div>

                {/* content  */}
                <div className="flex flex-wrap gap-12 items-center justify-center">
                    {listContents.map((item, index) => (
                        <img key={index} src={item.imgUrl} className={`${item.height ? item.height : "h-24"} hover:scale-105 duration-300 object-contain`} draggable={false} alt="" />
                    ))}
                </div>
            </div>
        </section>
    )
}
