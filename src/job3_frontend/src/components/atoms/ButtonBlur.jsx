import React from 'react'

export const ButtonBlur = ({ className = "", items, isDark = false }) => {
    return (
        <button className={`border ${isDark ? "border-white/20 bg-black/10" : "border-black/20 bg-white/10"}  justify-center items-center flex backdrop-blur-sm duration-300 ${className}`}>
            {items}
        </button>
    )
}
