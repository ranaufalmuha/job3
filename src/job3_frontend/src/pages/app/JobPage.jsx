import React from 'react'
import { JobCard } from '../../components/atoms/JobCard'

export const JobPage = () => {

    return (
        <div className='text-black flex w-full h-full '>

            <div className="flex flex-col w-full ">
                <div className="pb-8 px-6 flex flex-col gap-1">
                    <h1 className='base-bold text-2xl '>Discover your next Web3 journey.</h1>
                </div>

                {/* Jobs  */}
                <section id='jobs' className="flex flex-col pb-24 w-full overflow-auto">
                    {[...Array(10)].map((x, i) => (
                        <JobCard />
                    ))}
                </section>
            </div>
        </div>
    )
}
