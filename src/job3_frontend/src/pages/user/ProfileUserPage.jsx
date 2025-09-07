import React, { useEffect, useState } from 'react';
import { UrlComponent } from '../../components/atoms/UrlComponent';
import { Mail01Icon, Edit03Icon, Location01Icon, DiscordIcon, TelegramIcon } from '@hugeicons/core-free-icons';
import { WorkExperienceComponent } from '../../components/atoms/WorkExperienceComponent';
import { ProjectComponent } from '../../components/atoms/ProjectComponent';
import { useAuth } from '../../contexts/AuthContext';
import { Principal } from '@dfinity/principal';
import LoadingPage from '../additional/LoadingPage';
import { ProfessionalSummary } from '../../components/organisms/user/ProfessionalSummary';
import { WorkExperience } from '../../components/organisms/user/WorkExperience';
import { ProjectsForm } from '../../components/organisms/user/Project';
import { HugeiconsIcon } from '@hugeicons/react';
import { fromOpt, optFromList, optFromStr, someOrNone, strFromOpt } from '../../utils/candidOpt';
import { monthYearFromNs } from '../../utils/dates';
import GeneralInfoComponent from '../../components/organisms/user/GeneralInfoComponent';
import { ModalComponent } from '../../components/molecules/ModalComponent';

/** ===================== Helpers ===================== **/

const SectionHeader = ({ title, onEdit }) => (
    <div className="flex items-center gap-2">
        <h2 className='text-2xl base-bold'>{title}</h2>
        <button
            onClick={onEdit}
            className="text-sm p-2 rounded-md bg-transparent hover:bg-black/5 transition"
        >
            <HugeiconsIcon icon={Edit03Icon} />
        </button>
    </div>
);


/** ===================== Page ===================== **/
export const ProfileUserPage = () => {
    const { authenticatedActor, principal } = useAuth();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [err, setErr] = useState("");
    const [editor, setEditor] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!authenticatedActor || !principal) return;

        let cancelled = false;
        (async () => {
            setLoadingUser(true);
            setErr("");
            try {
                const pid = typeof principal === 'string' ? Principal.fromText(principal) : principal;
                const res = await authenticatedActor.getUserByPrincipalId(pid);
                if (cancelled) return;

                if (res && 'ok' in res) {
                    setUser(res.ok);
                } else if (res && 'err' in res) {
                    if (res.err?.NotFound !== undefined) {
                        setErr('NOT_FOUND');
                    } else {
                        setErr(typeof res.err === 'string' ? res.err : JSON.stringify(res.err));
                    }
                } else {
                    setErr('Unexpected response shape');
                }
            } catch (e) {
                setErr(e?.message || String(e));
            } finally {
                if (!cancelled) setLoadingUser(false);
            }
        })();

        return () => { cancelled = true; };
    }, [authenticatedActor, principal]);

    if (loadingUser) return <LoadingPage />;

    if (err === 'NOT_FOUND') {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center text-white gap-4">
                <p className="opacity-80">We couldn’t find your profile.</p>
                <a href="/create-user" className="bg-highlight px-4 py-2 rounded-md">Create your profile</a>
            </div>
        );
    }

    if (err && !user) {
        return (
            <div className="h-screen w-full flex items-center justify-center text-red-400">
                <div className="max-w-md text-center">
                    <p className="font-mono text-sm">Failed to load profile:</p>
                    <p className="font-mono text-xs opacity-80 break-words">{err}</p>
                </div>
            </div>
        );
    }

    // ✅ aman
    const fullName = user?.fullName ?? 'Unnamed';
    const email = user?.email ?? '';
    const location = user?.location ?? '';
    const profilePicture = fromOpt(user?.profilePicture, '');
    const psRaw = fromOpt(user?.professionalSummary, null);
    const professionalSummary = psRaw && {
        headline: psRaw.headline || '',
        bio: psRaw.bio || '',
        careerObjective: strFromOpt(psRaw.careerObjective, ''),
        resumeOrCV: strFromOpt(psRaw.resumeOrCV, ''),
    };
    const workExperiences = fromOpt(user?.workExperiences, null);
    const projects = fromOpt(user?.projects);

    // socialHandle: [] | [record]
    const sh = fromOpt(user?.socialHandle, null);
    const discord = sh ? strFromOpt(sh.discord, '-') : '-';
    const telegram = sh ? strFromOpt(sh.telegram, '-') : '-';

    // ===== Submit Handlers =====

    const handleSaveGeneral = async (f) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const payload = {
                email: (f.email || '').trim().toLowerCase(),
                fullName: (f.fullName || '').trim(),
                jobTitle: (f.jobTitle || '').trim(),
                location: (f.location || '').trim(),

                phoneNumber: optFromStr(f.phoneNumber),
                profilePicture: optFromStr(f.profilePicture),

                socialHandle: someOrNone({
                    discord: optFromStr(f.discord),
                    telegram: optFromStr(f.telegram),
                    personalWebsites: optFromList(f.personalWebsites),
                }),

                skillSet: someOrNone({
                    primaryRole: optFromList(f.primaryRole),
                    yearsOfExperience: optFromStr(f.yearsOfExperience),
                    techStack: optFromList(f.techStack),
                    languageSpoken: optFromList(f.languageSpoken),
                }),
            };

            const res = await authenticatedActor.updateGeneralUser(payload);
            if (res?.ok) {
                setUser(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === 'string' ? res.err : JSON.stringify(res.err)) : 'Unknown error';
                alert('Failed to update profile: ' + msg);
            }
        } catch (e) {
            alert('Failed to update profile: ' + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSummary = async (payload) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updateProfessionalSummaryUser(payload);
            if (res?.ok) {
                setUser(res.ok); // backend sudah return User terkini
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === 'string' ? res.err : JSON.stringify(res.err)) : 'Unknown error';
                alert('Failed to update summary: ' + msg);
            }
        } catch (e) {
            alert('Failed to update summary: ' + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveWork = async (payloadArray) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updateWorkExperiencesUser(payloadArray);
            if (res?.ok) {
                setUser(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === 'string' ? res.err : JSON.stringify(res.err)) : 'Unknown error';
                alert('Failed to update work experiences: ' + msg);
            }
        } catch (e) {
            alert('Failed to update work experiences: ' + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveProjects = async (payloadArray) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updatePastProjectUser(payloadArray);
            if (res?.ok) {
                setUser(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === 'string' ? res.err : JSON.stringify(res.err)) : 'Unknown error';
                alert('Failed to update projects: ' + msg);
            }
        } catch (e) {
            alert('Failed to update projects: ' + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="px-6 py-28 flex justify-center text-lg">
            <div className="max-w-[1200px] max-md:flex-col flex gap-12 w-full overflow-hidden">
                {/* left */}
                <div className="w-[500px] max-md:w-full flex flex-col items-center gap-8">
                    {/* Profile */}
                    <section className="w-full flex flex-col items-center gap-4 relative">
                        <div className="w-2/3 max-md:max-w-[200px] aspect-square rounded-full border overflow-hidden">
                            <img src={profilePicture || '/logo/loading.png'} alt={fullName || ' User'} className="w-full h-full object-cover" />
                        </div>
                        <button
                            onClick={() => setEditor('general')}
                            className="text-sm p-2 absolute top-0 right-0 rounded-md bg-transparent hover:bg-black/5 transition"
                            aria-label='General Edit Button'
                        >
                            <HugeiconsIcon icon={Edit03Icon} />
                        </button>
                        <div className="flex flex-col text-center gap-2">
                            <span className='text-3xl base-bold text-center'>{fullName}</span>
                            <span className='text-description'>
                                {user?.jobTitle ?? '-'}
                            </span>
                        </div>
                    </section>

                    {/* url detail */}
                    <section className='flex flex-col gap-3'>
                        <UrlComponent icon={Mail01Icon} url={email} />
                        <UrlComponent icon={Location01Icon} url={location} />
                        <UrlComponent icon={DiscordIcon} url={discord} />
                        <UrlComponent icon={TelegramIcon} url={telegram} />
                    </section>
                </div>

                {/* right */}
                <div className="w-full flex flex-col gap-8">
                    {/* Summary */}
                    <section className='flex flex-col gap-3'>
                        <SectionHeader title="Professional Summary" onEdit={() => setEditor('summary')} />
                        <p className='text-description text-base'>
                            {professionalSummary?.bio ?? 'No summary yet.'}
                        </p>
                        {professionalSummary?.careerObjective && (
                            <p className='text-description text-base opacity-80'>
                                <span className="opacity-70">Objective: </span>{professionalSummary.careerObjective}
                            </p>
                        )}
                    </section>

                    {/* Work Experience */}
                    <section className="flex flex-col gap-6">
                        <SectionHeader title="Work Experience" onEdit={() => setEditor('work')} />

                        {workExperiences?.length ? (
                            workExperiences.map((wE, i) => {
                                const companyNamePlain =
                                    Array.isArray(wE?.companyNamePlain) && wE.companyNamePlain.length
                                        ? wE.companyNamePlain[0]
                                        : '';

                                const startLabel = monthYearFromNs(wE.startDate);
                                const endLabel = wE.endDate && wE.endDate !== 0n ? monthYearFromNs(wE.endDate) : 'Present';

                                return (
                                    <WorkExperienceComponent
                                        key={i}
                                        companyProfilePicture="/logo/loading.png"
                                        companyName={companyNamePlain /* atau nama hasil resolve by CompanyId */}
                                        jobTitle={wE.jobTitle}
                                        startDate={startLabel}
                                        endDate={endLabel}
                                        responsibilities={wE.responsibilities}
                                        contributions={wE.contributions}
                                    />
                                );
                            })
                        ) : (
                            <p className="text-description opacity-70">No work experiences yet.</p>
                        )}
                    </section>

                    {/* Projects */}
                    <section className='flex flex-col gap-6'>
                        <SectionHeader title="Projects" onEdit={() => setEditor('projects')} />
                        {projects?.length ? (
                            projects.map((p, i) => (
                                <ProjectComponent
                                    key={i}
                                    title={p.title}
                                    role={p.role}
                                    link={p.link}
                                    shortDescription={p.shortDescription}
                                />
                            ))
                        ) : (
                            <p className='text-description opacity-70'>No projects yet.</p>
                        )}
                    </section>
                </div>
            </div>

            {/* ===== Modals ===== */}
            <ModalComponent
                open={editor === 'general'}
                title="Edit General Info"
                onClose={() => setEditor(null)}
            >
                <GeneralInfoComponent initial={user} submitting={saving} onSubmit={handleSaveGeneral} />
            </ModalComponent>

            <ModalComponent
                open={editor === 'summary'}
                title="Edit Professional Summary"
                onClose={() => setEditor(null)}
            >
                <ProfessionalSummary
                    initial={professionalSummary}
                    submitting={saving}
                    onSubmit={handleSaveSummary}
                />
            </ModalComponent>

            <ModalComponent
                open={editor === 'work'}
                title="Edit Work Experiences"
                onClose={() => setEditor(null)}
            >
                <WorkExperience
                    initial={workExperiences}
                    submitting={saving}
                    onSubmit={handleSaveWork}
                />
            </ModalComponent>

            <ModalComponent
                open={editor === 'projects'}
                title="Edit Projects"
                onClose={() => setEditor(null)}
            >
                <ProjectsForm
                    initial={projects}
                    submitting={saving}
                    onSubmit={handleSaveProjects}
                />
            </ModalComponent>
        </div>
    );
};
