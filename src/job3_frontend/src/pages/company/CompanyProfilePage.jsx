// pages/company/CompanyProfilePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Principal } from "@dfinity/principal";
import LoadingPage from "../additional/LoadingPage";
import { fromOpt, optFromStr, someOrNone } from "../../utils/candidOpt";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyJobs } from "./CompanyJobs";
import { CompanyCulture } from "./CompanyCulture";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Edit03Icon,
    Linkedin02Icon,
    NewTwitterIcon,
    TelegramIcon,
    DiscordIcon,
    Github01Icon,
    Link02Icon,
} from "@hugeicons/core-free-icons";
import { ModalComponent } from "../../components/molecules/ModalComponent";

/* ========================= Helpers ========================= */
const normalizeUrl = (u) => {
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : `https://${u}`;
};

/* ============ Image helpers (mirip contohmu) ============ */
const MAX_DIM = 512;
const TARGET_KB = 128;
const MAX_FILE_MB = 5;

async function fileToImage(file) {
    const url = URL.createObjectURL(file);
    try {
        const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = url;
        });
        return img;
    } finally {
        // URL.revokeObjectURL(url); // optional cleanup
    }
}

function drawToCanvas(img, maxDim = MAX_DIM) {
    const { width, height } = img;
    const scale = Math.min(1, maxDim / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
}

async function compressImageFile(file, { maxDim = MAX_DIM, targetKB = TARGET_KB } = {}) {
    const img = await fileToImage(file);
    const canvas = drawToCanvas(img, maxDim);
    const qualities = [0.9, 0.8, 0.7, 0.6, 0.5];
    let best = canvas.toDataURL("image/webp", 0.9);
    for (const q of qualities) {
        const dataUrl = canvas.toDataURL("image/webp", q);
        const sizeKB = Math.ceil((dataUrl.length * 3) / 4 / 1024);
        best = dataUrl;
        if (sizeKB <= targetKB) break;
    }
    return best;
}

/* ====================== Form (general) ====================== */
const CompanyGeneralForm = ({ initial, submitting, onSubmit }) => {
    const social = fromOpt(initial?.social, null);

    const [form, setForm] = useState({
        email: initial?.email || "",
        companyName: initial?.companyName || "",
        companyLogo: fromOpt(initial?.companyLogo, ""), // URL/dataURL
        linkedIn: social ? fromOpt(social.linkedIn, "") : "",
        x: social ? fromOpt(social.x, "") : "",
        telegram: social ? fromOpt(social.telegram, "") : "",
        discord: social ? fromOpt(social.discord, "") : "",
        github: social ? fromOpt(social.github, "") : "",
        bitbucket: social ? fromOpt(social.bitbucket, "") : "",
        other: social ? fromOpt(social.other, "") : "",
    });

    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");
    const [err, setErr] = useState("");

    const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const onPickFile = async (file) => {
        setUploadErr("");
        if (!file) return;
        if (!/^image\//.test(file.type)) {
            setUploadErr("File harus gambar (JPEG/PNG/WebP).");
            return;
        }
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
            setUploadErr(`Ukuran file maksimal ${MAX_FILE_MB}MB.`);
            return;
        }
        try {
            setUploading(true);
            const dataUrl = await compressImageFile(file, { maxDim: MAX_DIM, targetKB: TARGET_KB });
            set("companyLogo", dataUrl);
        } catch (e) {
            setUploadErr(e?.message || "Gagal memproses gambar.");
        } finally {
            setUploading(false);
        }
    };

    const onDrop = async (e) => {
        e.preventDefault();
        if (submitting || uploading) return;
        const file = e.dataTransfer.files?.[0];
        if (file) await onPickFile(file);
    };

    const onFileInputChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) await onPickFile(file);
        e.target.value = "";
    };

    const clearPhoto = () => {
        set("companyLogo", "");
        setUploadErr("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr("");
        if (!form.email.trim() || !form.companyName.trim()) {
            setErr("Email dan Company Name wajib diisi.");
            return;
        }
        onSubmit(form);
    };

    const previewSrc = form.companyLogo || "/logo/loading.png";

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Logo Upload */}
            <div className="grid gap-1">
                <span className="text-sm opacity-80">Company Logo</span>

                <div className="flex items-center justify-center gap-3">
                    <img
                        src={previewSrc}
                        alt="Preview logo"
                        className="w-[128px] h-[128px] rounded-md object-cover border border-black/10"
                    />
                    {form.companyLogo && (
                        <button
                            type="button"
                            className="text-xs text-red-400 hover:text-red-300"
                            onClick={clearPhoto}
                        >
                            Remove
                        </button>
                    )}
                </div>

                <div
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="mt-2 border border-dashed border-black/15 rounded-md p-3 text-sm flex items-center justify-between gap-3"
                >
                    <div className="opacity-80">
                        Drag & drop image here, or choose a file (auto-resize to {MAX_DIM}px)
                    </div>
                    <label className="px-3 py-1 rounded-md border border-black/10 bg-black/5 cursor-pointer">
                        {uploading ? "Uploading…" : "Choose File"}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFileInputChange}
                            disabled={uploading || submitting}
                        />
                    </label>
                </div>
                {uploadErr && <span className="text-xs text-red-400 mt-1">{uploadErr}</span>}

                {/* URL manual (opsional) */}
                <input
                    className="mt-2 bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm"
                    placeholder="or paste an image URL (optional)"
                    value={form.companyLogo}
                    onChange={(e) => set("companyLogo", e.target.value)}
                />
                <span className="text-[11px] text-white/50">
                    Accepted: JPG/PNG/WebP. We store small, optimized images for logos.
                </span>
            </div>

            {/* Required */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Email</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        required
                    />
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Company Name</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.companyName}
                        onChange={(e) => set("companyName", e.target.value)}
                        required
                    />
                </label>
            </div>

            {/* Socials */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">LinkedIn</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.linkedIn}
                        onChange={(e) => set("linkedIn", e.target.value)}
                        placeholder="linkedin.com/company/your-company"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">X (Twitter)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.x}
                        onChange={(e) => set("x", e.target.value)}
                        placeholder="x.com/your-handle"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Telegram</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.telegram}
                        onChange={(e) => set("telegram", e.target.value)}
                        placeholder="t.me/your-channel"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Discord</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.discord}
                        onChange={(e) => set("discord", e.target.value)}
                        placeholder="discord.gg/your-server"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">GitHub</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.github}
                        onChange={(e) => set("github", e.target.value)}
                        placeholder="github.com/your-org"
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Bitbucket</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.bitbucket}
                        onChange={(e) => set("bitbucket", e.target.value)}
                        placeholder="bitbucket.org/your-org"
                    />
                </label>
            </div>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Other Link (optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.other}
                    onChange={(e) => set("other", e.target.value)}
                    placeholder="Company site, Notion, etc."
                />
            </label>

            {err && <span className="text-xs text-red-400 mt-1">{err}</span>}

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white disabled:opacity-60"
                >
                    {submitting ? "Saving…" : "Save changes"}
                </button>
            </div>
        </form>
    );
};

/* ====================== Main Page ====================== */
export const CompanyProfilePage = () => {
    const { authenticatedActor, principal } = useAuth();
    const [company, setCompany] = useState(null);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [error, setError] = useState(null);

    const [editor, setEditor] = useState(null); // 'general' | null
    const [saving, setSaving] = useState(false);

    // URL tab sync
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || "about";
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const q = searchParams.get("tab");
        if ((q || "about") !== activeTab) {
            setActiveTab(q || "about");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const setTab = (tab) => {
        setActiveTab(tab);
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", tab);
            return next;
        }, { replace: true });
    };

    useEffect(() => {
        if (!authenticatedActor || !principal) return;

        let cancelled = false;
        (async () => {
            setLoadingCompany(true);
            setError(null);
            try {
                const pid = typeof principal === "string" ? Principal.fromText(principal) : principal;
                const res = await authenticatedActor.getCompanyByPrincipalId(pid);
                if (cancelled) return;

                if (res && "ok" in res) {
                    setCompany(res.ok);
                } else if (res && "err" in res) {
                    if (res.err?.NotFound !== undefined) {
                        setCompany(null);
                    } else {
                        setError(JSON.stringify(res.err));
                    }
                } else {
                    setError("Unexpected response shape");
                }
            } catch (e) {
                if (!cancelled) setError(e?.message || String(e));
            } finally {
                if (!cancelled) setLoadingCompany(false);
            }
        })();

        return () => { cancelled = true; };
    }, [authenticatedActor, principal]);

    const tabs = useMemo(
        () => [
            { key: "about", label: "About", component: <CompanyAbout company={company} onUpdated={(c) => setCompany(c)} /> },
            { key: "culture", label: "Life and Culture", component: <CompanyCulture company={company} onUpdated={(c) => setCompany(c)} /> },
            { key: "jobs", label: "Jobs", component: <CompanyJobs company={company} companyId={company?.companyId} /> },
        ],
        [company]
    );

    if (loadingCompany) return <LoadingPage />;
    if (error) {
        return (
            <div className="px-12 py-28 flex justify-center">
                <div className="max-w-[1000px] w-full text-red-400">
                    <p className="font-mono text-sm">Failed to load company: {error}</p>
                </div>
            </div>
        );
    }

    const active = tabs.find((t) => t.key === activeTab) || tabs[0];

    // Save handler
    const handleSaveGeneral = async (f) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const payload = {
                email: (f.email || "").trim().toLowerCase(),
                companyName: (f.companyName || "").trim(),
                companyLogo: optFromStr(f.companyLogo),
                social: someOrNone({
                    linkedIn: optFromStr(f.linkedIn),
                    x: optFromStr(f.x),
                    telegram: optFromStr(f.telegram),
                    discord: optFromStr(f.discord),
                    github: optFromStr(f.github),
                    bitbucket: optFromStr(f.bitbucket),
                    other: optFromStr(f.other),
                }),
            };
            const res = await authenticatedActor.updateCompanyGeneral(payload);
            if (res?.ok) {
                setCompany(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === "string" ? res.err : JSON.stringify(res.err)) : "Unknown error";
                alert("Failed to update company: " + msg);
            }
        } catch (e) {
            alert("Failed to update company: " + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    const CompanyHeader = () => {
        const stars = 4;

        const social = fromOpt(company?.social, null);
        const linkedIn = social ? fromOpt(social.linkedIn, "") : "";
        const x = social ? fromOpt(social.x, "") : "";
        const telegram = social ? fromOpt(social.telegram, "") : "";
        const discord = social ? fromOpt(social.discord, "") : "";
        const github = social ? fromOpt(social.github, "") : "";
        const other = social ? fromOpt(social.other, "") : "";

        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={fromOpt(company?.companyLogo, "/logo/loading.png")}
                        className="w-20 h-20 aspect-square object-cover rounded-md"
                        alt="Company logo"
                    />
                    <button
                        onClick={() => setEditor("general")}
                        className="text-sm p-2 rounded-md bg-transparent hover:bg-black/5 transition"
                    >
                        <HugeiconsIcon icon={Edit03Icon} />
                    </button>
                </div>

                <h1 className="text-3xl font-bold">{company?.companyName || ""}</h1>

                <div className="flex gap-4 text-headlines items-center">
                    {linkedIn && (
                        <a href={normalizeUrl(linkedIn)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Linkedin02Icon} />
                        </a>
                    )}
                    {x && (
                        <a href={normalizeUrl(x)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={NewTwitterIcon} />
                        </a>
                    )}
                    {telegram && (
                        <a href={normalizeUrl(telegram)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={TelegramIcon} />
                        </a>
                    )}
                    {discord && (
                        <a href={normalizeUrl(discord)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={DiscordIcon} />
                        </a>
                    )}
                    {github && (
                        <a href={normalizeUrl(github)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Github01Icon} />
                        </a>
                    )}
                    {other && (
                        <a href={normalizeUrl(other)} target="_blank" rel="noreferrer">
                            <HugeiconsIcon icon={Link02Icon} />
                        </a>
                    )}
                </div>

                {/* Tabs (local, no route) */}
                <nav className="text-xl flex gap-6 border-b-2">
                    {tabs.map((t) => {
                        const isActive = t.key === active.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`py-3 border-b-4 transition-colors ${isActive ? "text-highlight border-highlight" : "text-black border-transparent hover:text-highlight"
                                    }`}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        );
    };

    return (
        <div className="px-12 py-28 flex justify-center">
            <div className="max-w-[1000px] w-full flex flex-col gap-8">
                <CompanyHeader />
                {/* Render komponen tab aktif */}
                <div key={active.key}>{active.component}</div>
            </div>

            {/* Modal General Edit */}
            <ModalComponent
                open={editor === "general"}
                title="Edit Company"
                onClose={() => setEditor(null)}
            >
                <CompanyGeneralForm initial={company} submitting={saving} onSubmit={handleSaveGeneral} />
            </ModalComponent>
        </div>
    );
};
