import React, { useEffect, useState } from "react";
import { ModalComponent } from "../../components/molecules/ModalComponent";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "../additional/LoadingPage";
import { optFromList, optFromStr } from "../../utils/candidOpt";
import { JobCardComponent } from "../../components/organisms/company/JobCardComponent";

// ====== Helpers untuk Option & Variant ======
const optFromBool = (b) => (typeof b === "boolean" ? [b] : []);
// const optFromStr = (s) => (s && s.trim().length ? [s.trim()] : []);
// const optFromList = (arr) => (arr && arr.length ? [arr] : []);

// ?nat dari input string
const optNatFromStr = (s) => {
    const v = (s ?? "").trim();
    if (!v) return [];
    try {
        return [BigInt(v)];   // <- penting: kirim BigInt 123n
    } catch {
        return [];
    }
};

// mapper sesuai schema backend kamu:
const mapJobType = (s) => {
    switch ((s || "").toLowerCase()) {
        case "contract": return { contract: null };
        case "part-time": return { partTime: null };
        case "freelance": return { freelance: null };
        case "bounty": return { bounty: null };
        case "full-time":
        default: return { fullTime: null };
    }
};

const mapArrangement = (s) => {
    switch ((s || "").toLowerCase()) {
        case "onsite": return { onsite: null };
        case "hybrid": return { hybrid: null };
        case "remote":
        default: return { remote: null };
    }
};

const mapPayType = (s) => {
    switch ((s || "").toLowerCase()) {
        case "fiat": return { fiat: null };
        case "crypto": return { crypto: null };
        case "equity": return { equity: null };
        case "combo":
        default: return { combo: null };
    }
};

const mapHiringSpeedOpt = (s) => {
    switch ((s || "").toLowerCase()) {
        case "thisweek": return [{ thisWeek: null }];
        case "opentotalks": return [{ openToTalks: null }];
        case "immediate": return [{ immediate: null }];
        default: return []; // null
    }
};

// ====== Form ======
const JobForm = ({ companyId, submitting, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("full-time");
    const [arrangement, setArrangement] = useState("remote");
    const [payType, setPayType] = useState("combo");
    const [experience, setExperience] = useState("");

    // salary (optional)
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [currency, setCurrency] = useState("USD");

    const [ecosystems, setEcosystems] = useState("");
    const [techStackCsv, setTechStackCsv] = useState("");
    const [hiringSpeed, setHiringSpeed] = useState(""); // "", "thisWeek", "openToTalks", "immediate"
    const [verified, setVerified] = useState(false);
    const [kolPlatformsCsv, setKolPlatformsCsv] = useState("");

    const submit = (e) => {
        e.preventDefault();

        const techStackArr = techStackCsv.split(",").map(s => s.trim()).filter(Boolean);
        const kolPlatformsArr = kolPlatformsCsv.split(",").map(s => s.trim()).filter(Boolean);

        // Bentuk salary: ?{ min:?nat; max:?nat; currency:?text }
        const salaryRecord = {
            min: optNatFromStr(salaryMin),
            max: optNatFromStr(salaryMax),
            currency: optFromStr(currency),
        };
        // jika semua kosong, kirim null ([]), else Some([record])
        const salarySome =
            (salaryRecord.min.length || salaryRecord.max.length || salaryRecord.currency.length)
                ? [salaryRecord]
                : [];

        onSubmit({
            companyId,                        // principal
            title: title.trim(),
            description: description.trim(),
            jobType: mapJobType(jobType),     // variant
            experience: experience.trim(),
            arrangement: mapArrangement(arrangement),
            payTypes: mapPayType(payType),
            salary: salarySome,               // ?record
            ecosystems: optFromStr(ecosystems),
            techStack: techStackArr,          // vec text
            verified: optFromBool(verified),  // ?bool
            hiringSpeed: mapHiringSpeedOpt(hiringSpeed), // ?variant
            kolAudience: [],                  // opt vec variant (belum ada UI)
            kolPlatforms: optFromList(kolPlatformsArr),
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Job Title</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="Senior Rust Engineer"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Experience (free text)</span>
                    <input
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="3+ years / Senior / Lead"
                    />
                </label>
            </div>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Description</span>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2 min-h-[140px]"
                    placeholder="Tell candidates about the role, responsibilities, requirements…"
                />
            </label>

            <div className="grid md:grid-cols-4 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Job Type</span>
                    <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="bounty">Bounty</option>
                    </select>
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Arrangement</span>
                    <select
                        value={arrangement}
                        onChange={(e) => setArrangement(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    >
                        <option value="remote">Remote</option>
                        <option value="onsite">On-site</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Pay Type</span>
                    <select
                        value={payType}
                        onChange={(e) => setPayType(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    >
                        <option value="combo">Combo</option>
                        <option value="fiat">Fiat</option>
                        <option value="crypto">Crypto</option>
                        <option value="equity">Equity</option>
                    </select>
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Hiring Speed (optional)</span>
                    <select
                        value={hiringSpeed}
                        onChange={(e) => setHiringSpeed(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    >
                        <option value="">—</option>
                        <option value="thisWeek">This week</option>
                        <option value="openToTalks">Open to talks</option>
                        <option value="immediate">Immediate</option>
                    </select>
                </label>
            </div>

            {/* Salary */}
            <div className="grid md:grid-cols-3 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Salary Min (optional)</span>
                    <input
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value.replace(/\D/g, ""))}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        inputMode="numeric"
                        placeholder="e.g., 3000"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Salary Max (optional)</span>
                    <input
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value.replace(/\D/g, ""))}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        inputMode="numeric"
                        placeholder="e.g., 5000"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Currency</span>
                    <input
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="USD"
                    />
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Ecosystems (optional)</span>
                    <input
                        value={ecosystems}
                        onChange={(e) => setEcosystems(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="ICP, Solana, Ethereum"
                    />
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Tech Stack (comma separated)</span>
                    <input
                        value={techStackCsv}
                        onChange={(e) => setTechStackCsv(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="Motoko, React, Rust"
                    />
                </label>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                    />
                    <span className="text-sm opacity-80">Verified by Job3</span>
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">KOL Platforms (comma separated, optional)</span>
                    <input
                        value={kolPlatformsCsv}
                        onChange={(e) => setKolPlatformsCsv(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="YouTube, TikTok, Mirror"
                    />
                </label>
            </div>

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white disabled:opacity-60"
                >
                    {submitting ? "Posting…" : "Post job"}
                </button>
            </div>
        </form>
    );
};

// ====== Main component ======
export const CompanyJobs = ({ company, companyId }) => {
    const { authenticatedActor } = useAuth();
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [open, setOpen] = useState(false); // modal

    // fetch jobs
    useEffect(() => {
        if (!authenticatedActor || !companyId) return;
        let alive = true;

        (async () => {
            setLoading(true);
            try {
                const res = await authenticatedActor.getJobsByCompanyId(companyId);
                console.log(res?.ok);
                if (!alive) return;
                if (res?.ok) setJobs(res.ok);
                else setJobs([]);
            } catch (e) {
                if (alive) setJobs([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => { alive = false; };
    }, [authenticatedActor, companyId]);

    const createJob = async (payload) => {
        if (!authenticatedActor) return;
        setPosting(true);
        try {
            const res = await authenticatedActor.createJob(payload);
            if (res?.ok) {
                // prepend ke list
                setJobs((prev) => [res.ok, ...(prev || [])]);
                setOpen(false);
            } else {
                const msg = res?.err ? (typeof res.err === "string" ? res.err : JSON.stringify(res.err)) : "Unknown error";
                alert("Failed to create job: " + msg);
            }
        } catch (e) {
            alert("Failed to create job: " + (e?.message || String(e)));
        } finally {
            setPosting(false);
        }
    };

    if (loading) return <LoadingPage />;

    return (
        <div className="text-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recently posted jobs</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white"
                >
                    Post a job
                </button>
            </div>

            {jobs?.length ? (
                <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
                    {jobs.map((j, idx) => (
                        <JobCardComponent key={idx} company={company} item={j} />
                    ))}
                </div>
            ) : (
                <p className="text-description">No jobs posted yet.</p>
            )}
            {/* Modal Create */}
            <ModalComponent
                open={open}
                title="Create Job"
                onClose={() => setOpen(false)}
            >
                <JobForm
                    companyId={companyId}
                    submitting={posting}
                    onSubmit={createJob}
                />
            </ModalComponent>
        </div>
    );
};
