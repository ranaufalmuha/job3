import React, { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "./../../lib/countries";
import { AnimatePresence, motion } from "framer-motion";

export default function CountrySelector({
    id,
    open,
    disabled = false,
    onToggle,
    onChange,
    selectedValue,
    label = "Location",
    isDark = true, // 👈 new param
}) {
    const ref = useRef(null);
    const [query, setQuery] = useState("");

    // Tutup saat klik di luar / tekan ESC
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!open) return;
            if (ref.current && !ref.current.contains(e.target)) {
                onToggle(false);
                setQuery("");
            }
        };
        const handleKey = (e) => {
            if (!open) return;
            if (e.key === "Escape") {
                onToggle(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open, onToggle]);

    const filtered = COUNTRIES.filter((c) =>
        c.title.toLowerCase().startsWith(query.toLowerCase())
    );

    return (
        <div ref={ref} className="relative">
            {label && (
                <label
                    id={`${id}-label`}
                    className={`block text-sm mb-2 ${isDark ? "text-white/50" : "text-black/50"
                        }`}
                >
                    {label}
                </label>
            )}
            {/* Trigger */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => onToggle(!open)}
                className={[
                    "relative w-full rounded-md border px-3 pr-10 py-2 text-left cursor-default sm:text-sm",
                    disabled ? "opacity-50 cursor-not-allowed" : "",
                    isDark
                        ? "bg-white/5 border-white/10 text-white/90 focus:border-highlight"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500",
                    "focus:outline-none focus:ring-0 transition-colors duration-200",
                ].join(" ")}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="truncate flex items-center gap-2">
                    {selectedValue?.value && (
                        <img
                            alt={selectedValue?.value}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue?.value}.svg`}
                            className="inline h-4 rounded-sm"
                        />
                    )}
                    {selectedValue?.title || "Select country"}
                </span>
                {!disabled && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            className={`h-5 w-5 ${isDark ? "text-white/50" : "text-gray-400"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className={[
                            "absolute z-50 mt-2 w-full rounded-md overflow-hidden shadow-lg",
                            isDark
                                ? "bg-headlines/95 backdrop-blur border border-white/10 text-white"
                                : "bg-white border border-gray-200 text-gray-900",
                            "text-base focus:outline-none sm:text-sm",
                        ].join(" ")}
                        role="listbox"
                        aria-labelledby={`${id}-label`}
                    >
                        {/* Search sticky */}
                        <div
                            className={[
                                "sticky top-0 z-10 p-2 border-b",
                                isDark
                                    ? "bg-headlines/95 border-white/10"
                                    : "bg-white border-gray-200",
                            ].join(" ")}
                        >
                            <input
                                type="search"
                                name="search"
                                autoComplete="off"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search a country"
                                className={[
                                    "w-full p-2 rounded-md outline-none sm:text-sm",
                                    isDark
                                        ? "bg-transparent border border-white/10 text-white placeholder-white/50 focus:border-highlight"
                                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500",
                                    "focus:ring-0",
                                ].join(" ")}
                            />
                        </div>

                        {/* List */}
                        <div
                            className={[
                                "max-h-64 overflow-y-auto",
                                isDark
                                    ? "scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
                                    : "scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400",
                            ].join(" ")}
                        >
                            {filtered.length === 0 ? (
                                <li
                                    className={`px-3 py-2 ${isDark ? "text-white/60" : "text-gray-500"
                                        }`}
                                >
                                    No countries found
                                </li>
                            ) : (
                                filtered.map((value, idx) => (
                                    <li
                                        key={`${id}-${idx}`}
                                        role="option"
                                        onClick={() => {
                                            onChange(value.value);
                                            setQuery("");
                                            onToggle(false);
                                        }}
                                        className={[
                                            "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors",
                                            isDark
                                                ? "text-white/90 hover:bg-white/5"
                                                : "text-gray-900 hover:bg-gray-100",
                                        ].join(" ")}
                                    >
                                        <img
                                            alt={value.value}
                                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                                            className="inline h-4 rounded-sm"
                                        />
                                        <span className="truncate">{value.title}</span>
                                        {value.value === selectedValue?.value && (
                                            <span
                                                className={`ml-auto ${isDark ? "text-highlight" : "text-blue-600"
                                                    }`}
                                            >
                                                {/* check icon */}
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </li>
                                ))
                            )}
                        </div>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
