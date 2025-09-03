import React from 'react'

export const InputLogin = ({ type, name, placeholder, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2 text-sm">
            <label htmlFor={name} className="text-white/50 capitalize">{name}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}        // <-- penting
                placeholder={placeholder}
                className="bg-transparent border border-white/10 p-3 rounded-md w-full focus:outline-none focus:border-highlight focus:border-2"
            />
        </div>
    );
};
