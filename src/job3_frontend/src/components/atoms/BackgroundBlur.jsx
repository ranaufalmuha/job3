import React from 'react'

export const BackgroundBlur = ({ className = "", items }) => {
    return (
        <div className={`border border-white/20 justify-center items-center flex backdrop-blur-sm bg-black/10 duration-300 ${className}`}>
            {items}
        </div>
    )
}
