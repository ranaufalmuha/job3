import React from 'react'

export const CheckboxComponent = ({ index, title, item }) => {
    return (
        <div className="flex items-center gap-x-3">
            <input
                id={`${title}-${index}`}
                type="checkbox"
                name={title}
                value={item.value}
                className="h-5 w-5 accent-black rounded-md"
            />
            <label htmlFor={`${title}-${index}`} className="text-gray-700 cursor-pointer">
                {item.name}
            </label>
        </div>
    )
}
