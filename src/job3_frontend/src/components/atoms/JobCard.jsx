import React from 'react'

export const JobCard = () => {
    return (
        <div className="w-full">
            <div className="flex gap-4 duration-300 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:bg-black/10 before:w-0 hover:before:w-full before:transition-width before:duration-300 overflow-hidden group hover:cursor-pointer p-4">
                {/* image  */}
                <img src="/logo/dfinity_logo.jpeg" className='w-14 h-14 aspect-square object-cover rounded-lg' width={"100%"} height={"100%"} alt="" />

                {/* content  */}
                <div className="flex flex-col w-full">
                    <h2 className='base-bold text-lg line-clamp-2'>Full-Time Software Engineer</h2>
                    <span className=''>Dfinity</span>
                    <span className='text-description text-sm'>Indonesia (Remote)</span>
                    <span className='text-description text-sm'>$120k - $240k</span>
                </div>
            </div>
        </div>
    )
}
