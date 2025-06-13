import React from 'react'

export const TitleH2 = ({ text, className = "" }) => {
    return (
        <h2 className={`text-5xl/tight max-w-[1000px] max-lg:text-3xl duration-300 ${className}`}>{text}</h2>
    )
}
