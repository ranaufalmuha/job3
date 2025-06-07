import React from 'react'
import { InputLogin } from '../components/atoms/InputLogin'

export const LoginPage = () => {
    return (
        <main className='w-full h-screen p-4 flex bg-black text-white gap-8'>
            <section className='w-2/5 h-full relative overflow-hidden rounded-xl group bg-headlines flex flex-col items-center p-8'>
                <div className="flex items-center gap-2 z-10 ">
                    <img src="./logo/icon.svg" className="h-6" alt="" />
                    <label className='text-2xl'>Job3</label>
                </div>
                <img src="/images/landing1.webp" className='w-full h-full object-cover group-hover:scale-105 duration-300 absolute top-0 left-0 opacity-60' alt="" />
            </section>

            {/* form  */}
            <section className='w-3/5 flex justify-center items-center'>
                <form action="" className='bg-headlines p-6 rounded-lg flex flex-col gap-6 max-w-[500px] w-full'>
                    <h1 className='text-2xl'>Login</h1>
                    <InputLogin type={"email"} name={"Email"} />
                    <InputLogin type={"password"} name={"Password"} />
                    <button className='bg-highlight p-3 rounded-md'>Log in</button>
                    <div className="flex items-center">
                        <hr className='border-white/10 w-full' />
                        <span className='text-[0.6rem] border py-1 px-2 rounded-full border-white/10 text-white/50'>OR</span>
                        <hr className='border-white/10 w-full' />
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>
                            <img src="/others/google.webp" alt="" className='w-4 h-4' />
                            <span>Log in with Google</span>
                        </button>
                        <button className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>
                            <img src="/others/nfid.avif" alt="" className='w-4 h-4' />
                            <span>Log in with NFID</span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}
