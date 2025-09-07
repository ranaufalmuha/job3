// src/components/LoadingPage.jsx
import React from "react";

const LoadingPage = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/10 backdrop-blur-sm z-50 text-white">
            <img src="./logo/primary.png" className="w-28 animate-pulse" alt="" />
        </div>
    );
};

export default LoadingPage;
