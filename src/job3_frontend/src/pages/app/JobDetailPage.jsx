import React from 'react'
import { Link } from 'react-router-dom'

export const JobDetailPage = () => {
    return (
        <div className="px-6 py-28 flex justify-center text-lg">

            <div className="max-w-[1300px] flex flex-col gap-8 w-full">

                <section className=" flex flex-col gap-4">
                    {/* Header  */}
                    {/* company  */}
                    <Link to={"/company/dfinity"} className="flex gap-3 items-center">
                        <img src="/logo/dfinity_logo.jpeg" className='w-8 h-8 aspect-square object-cover rounded-md' width={"100%"} height={"100%"} alt="" />
                        <span className='line-clamp-1'>Dfinity</span>
                    </Link>

                    <h2 className='text-3xl base-bold'>Full-Time Software Engineer</h2>
                    <div className="flex flex-col gap-2">
                        <span className='text-description text-sm'>Indonesia (Remote)</span>
                        <span className='text-description text-sm'>$120k - $240k</span>
                    </div>

                    <div className="flex gap-4">
                        <button className='bg-highlight text-white py-2 px-6 rounded-md'>Apply</button>
                        <button className='text-highlight border border-highlight py-2 px-6 rounded-md'>Save</button>
                    </div>
                </section>


                {/* About Job  */}
                <section className='flex flex-col gap-4 '>
                    <h3 className='text-xl base-bold'>About the Job</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur neque odio consectetur? Perspiciatis accusamus voluptas officia eius natus aperiam quasi voluptates deleniti ratione enim obcaecati unde, quis nulla aut a?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur neque odio consectetur? Perspiciatis accusamus voluptas officia eius natus aperiam quasi voluptates deleniti ratione enim obcaecati unde, quis nulla aut a? Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, nobis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, quam!</p>
                    <p><strong className='base-bold'>The Program</strong></p>
                    <p>Are you passionate about gaming, blockchain, and cutting-edge technology? Argus Labs is offering an exciting paid internship program designed to provide you with hands-on experience in a global, innovative environment. Whether you're a developer, designer, or a creative thinker, we want to hear from you!
                    </p>
                    <p><strong className='base-bold'>What We’re Looking For</strong></p>
                    <ul className='list-disc pl-4'>
                        <li>Practical experience working on innovative projects in gaming and blockchain</li>
                        <li>Mentorship and guidance from industry professionals.</li>
                        <li>Networking opportunities with a global community of creators and developers.</li>
                        <li>Flexible work-from-home arrangements.</li>
                    </ul>
                </section>

            </div>
        </div>

    )
}
