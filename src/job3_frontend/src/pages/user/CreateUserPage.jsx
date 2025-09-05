import React, { useEffect, useState } from 'react'
import { InputLogin } from './../../components/atoms/InputLogin'
import { Link, useNavigate } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserIcon, Building03Icon } from '@hugeicons/core-free-icons';
import { useAuth } from '../../contexts/AuthContext';
import CountrySelector from '../../components/atoms/CountrySelector';
import { COUNTRIES } from "./../../lib/countries";
import LoadingPage from '../additional/LoadingPage';
import { Principal } from '@dfinity/principal';

export const CreateUserPage = () => {
    const { authenticatedActor, principal, loading } = useAuth();
    const [optionValue, setOptionValue] = useState("job-seeker"); // "job-seeker" | "company"
    const isCompany = optionValue === "company";
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState("ID");
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const options = [
        { value: "job-seeker", label: "Job Seeker", icon: UserIcon },
        { value: "company", label: "Company", icon: Building03Icon },
    ];

    // shared fields
    const [email, setEmail] = useState("");

    // job-seeker only
    const [fullName, setFullName] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    // company only
    const [companyName, setCompanyName] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;             // tunggu auth siap
        if (!principal || !authenticatedActor) return; // belum login: stay di halaman create-user

        let cancelled = false;
        (async () => {
            const pid = typeof principal === 'string' ? Principal.fromText(principal) : principal;
            const res = await authenticatedActor.getUserByPrincipalId(pid);
            if (cancelled) return;

            if ('ok' in res) {
                navigate('/profile');        // sudah punya profil
            }
            // kalau NotFound: biarkan user isi form create (JANGAN redirect)
        })();

        return () => { cancelled = true; };
    }, [loading, principal, authenticatedActor, navigate]);

    if (loading) return <LoadingPage />;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg("");

        if (!authenticatedActor) {
            alert("Please sign in with Internet Identity first.");
            return;
        }

        // basic validation
        if (!email) {
            setErrMsg("Email are required.");
            return;
        }
        if (!isCompany && (!fullName || !location || !jobTitle)) {
            setErrMsg("Full name, Job Title and location are required for Job Seeker.");
            return;
        }
        if (isCompany && !companyName) {
            setErrMsg("Company name is required for Company.");
            return;
        }

        setLoadingSubmit(true);
        try {
            let res;
            if (isCompany) {
                res = await authenticatedActor.createCompany({
                    email: email,
                    companyName: companyName,
                    location: location,
                });
            } else {
                res = await authenticatedActor.createUser({
                    email: email,
                    fullName: fullName,
                    location: location,
                    jobTitle: jobTitle,
                });
            }

            // Jika canister pakai variant { #ok(...) } | { #err(...) }
            if (res?.ok || (res && res.ok !== undefined)) {
                // beberapa candid tools map ke { ok, err }
                navigate(isCompany ? '/company/profile' : '/profile');
            } else if (res?.err) {
                setErrMsg(typeof res.err === "string" ? res.err : "Failed to create.");
            } else {
                // fallback
                navigate(isCompany ? '/company/profile' : '/profile');
            }
        } catch (error) {
            console.error("❌ create failed:", error);
            setErrMsg(error?.message || "Unexpected error.");
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <main className='w-full min-h-screen p-4 flex bg-black text-white gap-8'>
            <section className='w-2/5 min-h-full relative overflow-hidden rounded-xl group bg-headlines flex flex-col items-center p-8'>
                <Link to={"/"} className="flex hover:cursor-pointer items-center gap-2 z-10 ">
                    <img src="./logo/icon.svg" className="h-6" alt="" />
                    <label className='text-2xl'>Job3</label>
                </Link>
                <img src="/images/landing/landing4.webp" className='w-full h-full object-cover group-hover:scale-105 duration-300 absolute top-0 left-0 opacity-60' alt="" />
            </section>

            {/* form  */}
            <section className='w-3/5 flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='bg-headlines p-6 rounded-lg flex flex-col gap-6 max-w-[520px] w-full'>
                    <h1 className='text-2xl'>Sign up and get started</h1>

                    {/* selector */}
                    <div className="grid grid-cols-2 bg-white/5 p-1 rounded-lg">
                        {options.map((item) => (
                            <button
                                key={item.value}
                                type='button'
                                onClick={() => setOptionValue(item.value)}
                                className={`flex text-sm gap-2 p-2 items-center justify-center rounded-lg duration-300 ${optionValue === item.value ? "bg-headlines" : "opacity-60"}`}
                            >
                                <HugeiconsIcon icon={item.icon} width={18} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* shared */}
                    <InputLogin
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* conditional fields */}
                    {!isCompany && (
                        <>
                            <InputLogin
                                type="text"
                                name="full name"
                                placeholder="Your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <InputLogin
                                type="text"
                                name="Job Title"
                                placeholder="Your Current Job Title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </>
                    )}

                    {isCompany && (
                        <>
                            <InputLogin
                                type="text"
                                name="company name"
                                placeholder="Your company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </>
                    )}

                    <CountrySelector
                        id={"country-selector"}
                        open={isOpen}
                        onToggle={() => setIsOpen(!isOpen)}
                        onChange={setLocation}
                        selectedValue={COUNTRIES.find((option) => option.value === location)}
                    />

                    {errMsg && <p className="text-sm text-red-400">{errMsg}</p>}

                    <button
                        type="submit"
                        disabled={loadingSubmit}
                        className='bg-highlight p-3 rounded-md disabled:opacity-60'
                    >
                        {loadingSubmit ? "Creating..." : "Continue"}
                    </button>

                    <p className="text-xs text-white/60">
                        By continuing, you agree to our Terms and Privacy Policy.
                    </p>
                </form>
            </section>
        </main>
    );
};
