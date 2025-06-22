import React, { useState } from 'react'
import { InputLogin } from '../components/atoms/InputLogin'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserIcon, Building03Icon } from '@hugeicons/core-free-icons';

export const SignupPage = () => {

    const [optionValue, setOptionValue] = useState("job-seeker")
    const options = [
        { value: "job-seeker", label: "Job Seeker", icon: UserIcon, },
        { value: "company", label: "Company", icon: Building03Icon, },
    ];

    return (
        <main className='w-full h-screen p-4 flex bg-black text-white gap-8'>
            <section className='w-2/5 h-full relative overflow-hidden rounded-xl group bg-headlines flex flex-col items-center p-8'>
                <Link to={"/"} className="flex hover:cursor-pointer items-center gap-2 z-10 ">
                    <img src="./logo/icon.svg" className="h-6" alt="" />
                    <label className='text-2xl'>Job3</label>
                </Link>
                <img src="/images/landing/landing4.webp" className='w-full h-full object-cover group-hover:scale-105 duration-300 absolute top-0 left-0 opacity-60' alt="" />
            </section>

            {/* form  */}
            <section className='w-3/5 flex justify-center items-center'>
                <form action="" className='bg-headlines p-6 rounded-lg flex flex-col gap-6 max-w-[500px] w-full'>
                    <h1 className='text-2xl'>Sign up and get started</h1>

                    {/* select  */}
                    <div className="grid grid-cols-2 bg-white/5 p-1 rounded-lg">
                        {options.map((item) => (
                            <button key={item.value} onClick={() => setOptionValue(item.value)} type='button' className={`flex text-sm gap-2 p-2 items-center justify-center rounded-lg  duration-300 ${optionValue === item.value ? "bg-headlines" : "opacity-50"}`}>
                                <HugeiconsIcon icon={item.icon} width={18} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <InputLogin type={"email"} name={"email"} placeholder={"Enter your Email"} />
                    <button className='bg-highlight p-3 rounded-md'>Continue</button>

                    <div className={`flex flex-col gap-6 overflow-hidden duration-300 ${optionValue === "job-seeker" ? "max-h-96" : "max-h-0"}`}>
                        <div className="flex items-center">
                            <hr className='border-white/10 w-full' />
                            <span className='text-[0.6rem] border py-1 px-2 rounded-full border-white/10 text-white/50'>OR</span>
                            <hr className='border-white/10 w-full' />
                        </div>
                        <div className="flex flex-col gap-3">
                            <button className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>
                                <img src="/others/google.webp" alt="" className='w-4 h-4' />
                                <span>Continue with Google</span>
                            </button>
                            <button className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>
                                <img src="/others/nfid.avif" alt="" className='w-4 h-4' />
                                <span>Continue with NFID</span>
                            </button>
                            <button className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>
                                <img src="/logo/icp.webp" alt="" className='w-4 h-4' />
                                <span>Continue with Internet Identity</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex text-sm justify-center gap-1 text-white/50">
                        <p>Already have a job3 account?</p>
                        <Link to={"/login"} className='text-white'>Log in</Link>
                    </div>
                </form>
            </section>
        </main>
    )
}
