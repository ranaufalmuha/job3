// src/components/LoadingPage.jsx
import React from "react";

const LoadingPage = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-black text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
    );
};

export default LoadingPage;
