import React, { useState } from "react";

export const SalarySliderComponent = ({ minSalary = 100, maxSalary = 5000, step = 50 }) => {
    const [range, setRange] = useState({ min: minSalary, max: maxSalary });

    // Untuk memastikan min < max
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), range.max - step);
        setRange({ ...range, min: value });
    };
    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), range.min + step);
        setRange({ ...range, max: value });
    };

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-lg">Salary</h3>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">${range.min.toLocaleString()}</span>
                <span className="flex-1 h-0.5 bg-gray-200 rounded mx-2" />
                <span className="text-sm">${range.max.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
                {/* Min slider */}
                <input
                    type="range"
                    min={minSalary}
                    max={maxSalary}
                    step={step}
                    value={range.min}
                    onChange={handleMinChange}
                    className="w-full accent-black "
                />
                {/* Max slider */}
                <input
                    type="range"
                    min={minSalary}
                    max={maxSalary}
                    step={step}
                    value={range.max}
                    onChange={handleMaxChange}
                    className="w-full accent-black"
                />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
                <span>Min: ${minSalary.toLocaleString()}</span>
                <span>Max: ${maxSalary.toLocaleString()}</span>
            </div>
        </div>
    );
};
