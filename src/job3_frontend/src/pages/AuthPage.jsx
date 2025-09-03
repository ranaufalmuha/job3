import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Id2Logo } from '../components/atoms/LogoSvg';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage = () => {
    const { login, loading, error, isAuthenticated } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    // Redirect jika sudah authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/create-user'); // atau route yang sesuai
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission

        if (isLoggingIn) return; // Prevent double click

        setIsLoggingIn(true);
        console.log("🔐 User clicked login button");

        try {
            await login();
            console.log("✅ Login process completed");
            // Navigation akan handled oleh useEffect di atas
        } catch (error) {
            console.error("❌ Login failed:", error);
            // Error sudah di-handle di AuthContext
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (loading) {
        return (
            <main className='w-full h-screen p-4 flex bg-black text-white items-center justify-center'>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Checking authentication...</p>
                </div>
            </main>
        );
    }
    return (
        <main className='w-full h-screen p-4 flex bg-black text-white gap-8'>
            <section className='w-2/5 h-full relative overflow-hidden rounded-xl group bg-headlines flex flex-col items-center p-8'>
                <Link to={"/"} className="flex hover:cursor-pointer items-center gap-2 z-10 ">
                    <img src="./logo/icon.svg" className="h-6" alt="" />
                    <label className='text-2xl'>Job3</label>
                </Link>
                <img src="/images/landing/landing4.webp" className='w-full h-full object-cover group-hover:scale-105 duration-300 absolute top-0 left-0 opacity-60' alt="" />
            </section>

            {/* form  */}
            <section className='w-3/5 flex justify-center items-center'>
                <form action="" className='bg-headlines p-6 rounded-lg flex flex-col gap-6 max-w-[500px] w-full'>
                    <h1 className='text-2xl'>Sign in and get started</h1>

                    <div className={`flex flex-col gap-6 overflow-hidden duration-300`}>
                        <div className="flex flex-col gap-3">
                            <button onClick={handleLogin} className='bg-white/10 p-3 rounded-md flex items-center gap-2 justify-center'>

                                <div className="w-6">
                                    <Id2Logo />
                                </div>
                                <span>Continue with Internet Identity 2</span>
                            </button>
                        </div>
                    </div>

                </form>
            </section>
        </main>
    )
}
