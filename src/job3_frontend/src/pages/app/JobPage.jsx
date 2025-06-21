import React from 'react'
import { JobCard } from '../../components/atoms/JobCard'
import { JobDetailPage } from './JobDetailPage'

export const JobPage = () => {

    return (
        <div className='text-black flex w-full h-full '>

            <div className="flex flex-col w-2/5 overflow-auto max-md:w-full">
                <div className="p-4 border-y flex flex-col gap-1">
                    <h1 className='base-bold text-xl '>Top job picks for you</h1>
                    <p className='text-description line-clamp-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo quod veritatis accusantium autem</p>
                </div>

                {/* Jobs  */}
                <section id='jobs' className="flex flex-col overflow-auto pb-24 w-full min-w-[250px] md:max-w-[500px] max-md:w-full">
                    {[...Array(10)].map((x, i) => (
                        <JobCard />
                    ))}
                </section>
            </div>

            {/* Detail Job  */}
            <section className='w-3/5 border max-md:hidden'>
                <JobDetailPage />
            </section>

        </div>
    )
}
