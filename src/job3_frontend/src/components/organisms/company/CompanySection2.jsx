import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { WorkIcon, ArrowUpRight01Icon, UserAiIcon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { useAuth } from '../../../contexts/AuthContext';
import { fromOpt } from '../../../utils/candidOpt';

export const CompanySection2 = () => {
    const { authenticatedActor } = useAuth();
    const [companyList, setCompanyList] = useState(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            if (!authenticatedActor) { setCompanyList([]); return; }
            try {
                // 1) ambil semua company
                const res = await authenticatedActor.getAllCompany();
                console.log(res)
                if (!alive) return;

                let list = [];
                if (res?.ok && Array.isArray(res.ok)) {
                    list = res.ok.map((c) => ({
                        companyId: c.companyId?.toText?.() ?? c.companyId?.toString?.() ?? '',
                        companyLogo: fromOpt(c.companyLogo, ''),
                        title: c.companyName,
                        totalJob: 0,
                    }));

                    // 2) hitung total jobs per company (parallel)
                    const counts = await Promise.all(
                        list.map(async (item) => {
                            try {
                                const pid = Principal.fromText(item.companyId);
                                const jr = await authenticatedActor.getJobsByCompanyId(pid);
                                return jr?.ok ? (jr.ok.length || 0) : 0;
                            } catch {
                                return 0;
                            }
                        })
                    );

                    list = list.map((it, i) => ({ ...it, totalJob: counts[i] }));
                }

                setCompanyList(list);
            } catch (e) {
                console.warn('CompanySection2: failed to fetch companies', e);
                setCompanyList([]);
            }
        })();

        return () => { alive = false; };
    }, [authenticatedActor]);

    // skeleton saat loading: tetap pakai style/card yang sama
    const skeletons = Array.from({ length: 8 }, () => null);

    return (
        <section className='w-full p-4 py-12 flex justify-center'>
            <div className="w-[1300px] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-12">
                {(companyList ?? skeletons).map((item, index) => (
                    item ? (
                        <Link
                            key={index}
                            to={"/companies/" + item.companyId}
                            className="relative flex aspect-square flex-col justify-between gap-4 p-8 border rounded-xl before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:bg-headlines/5 before:w-0 hover:before:w-full before:transition-width before:duration-300 overflow-hidden group hover:cursor-pointer"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between relative">
                                    <div className="h-12">
                                        <img
                                            src={item.companyLogo ? item.companyLogo : "./logo/loading.png"}
                                            className='w-full h-full object-contain'
                                            alt=""
                                        />
                                    </div>
                                    <button className="w-0 h-0 overflow-hidden max-lg:h-10 max-lg:w-10 group-hover:border border-headlines/20 group-hover:p-2 rounded-lg justify-center items-center flex aspect-square backdrop-blur-sm bg-white/10 duration-200 absolute group-hover:w-12 group-hover:h-12 right-0">
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} className='' />
                                    </button>
                                </div>
                                <h3 className='text-lg'>{item.title}</h3>
                            </div>
                            <div className="flex">
                                <p className='text-highlight bg-highlight/10 text-sm py-1 px-4 rounded-full'>{item.totalJob} Jobs</p>
                            </div>
                        </Link>
                    ) : (
                        <div
                            key={index}
                            className="relative flex aspect-square flex-col justify-between gap-4 p-8 border rounded-xl overflow-hidden"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between relative">
                                    <div className="h-12 w-full">
                                        <div className='w-full h-full rounded bg-black/10' />
                                    </div>
                                </div>
                                <div className='h-4 w-1/2 bg-black/10 rounded' />
                            </div>
                            <div className="flex">
                                <div className='h-6 w-24 bg-black/10 rounded-full' />
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};
