import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Money01Icon, Location10Icon, WorkIcon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';

export const JobCard = () => {
    return (
        <Link to={"/jobs/dfinity/3"} className="w-full border border-description/10">
            <div className="flex gap-4 duration-300 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:bg-black/10 before:w-0 hover:before:w-full before:transition-width before:duration-300 overflow-hidden group hover:cursor-pointer p-6">
                {/* image  */}
                <img src="/logo/dfinity_logo.jpeg" className='w-14 h-14 aspect-square object-cover rounded-lg' width={"100%"} height={"100%"} alt="" />

                {/* content  */}
                <div className="flex flex-col w-full gap-1">
                    <h2 className='base-bold text-lg line-clamp-2'>Full-Time Software Engineer</h2>
                    <span className='pb-1'>Dfinity</span>
                    <div className="flex gap-2 text-description text-sm">
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={WorkIcon} className='h-5' />
                            <span >
                                Remote
                            </span>
                        </div>
                        <span>|</span>
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={Location10Icon} className='h-5' />
                            <span >
                                Indonesia
                            </span>
                        </div>
                        <span>|</span>
                        <div className="flex gap-1 items-center">
                            <HugeiconsIcon icon={Money01Icon} className='h-5' />
                            <span >$120k - $240k</span>
                        </div>
                    </div>

                    <p className='text-description line-clamp-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nemo ipsa voluptate sint fugiat odit dolore quisquam ullam eius unde, voluptatibus adipisci veniam enim ea, dolor saepe. Repellendus, tenetur? Commodi facere, impedit in unde nihil distinctio? Beatae non voluptatum quibusdam?
                    </p>
                </div>
            </div>
        </Link>
    )
}
