import React from 'react'

export const InputLogin = ({ type, name, placeholder }) => {
    return (
        <div className="flex flex-col gap-2 text-sm ">
            <label className='text-white/50 capitalize'>{name}</label>
            <input type={type} name={name} placeholder={placeholder} id={name} className='bg-transparent border border-white/10 p-3 rounded-md w-full focus:outline-none focus:border-highlight focus:border-2' />
        </div>
    )
}
