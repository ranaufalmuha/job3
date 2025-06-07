import React from 'react'

export const InputLogin = ({ type, name }) => {
    return (
        <div className="flex flex-col gap-2 text-sm ">
            <label className='text-white/50'>{name}</label>
            <input type={type} name={name} placeholder={"Enter your " + name} id="" className='bg-transparent border border-white/10 p-3 rounded-md w-full focus:outline-none focus:border-highlight focus:border-2' />
        </div>
    )
}
