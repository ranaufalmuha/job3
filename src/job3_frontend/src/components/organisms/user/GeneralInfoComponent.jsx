import React, { useState } from 'react';
import { fromOpt } from '../../../utils/candidOpt';
import CountrySelector from '../../atoms/CountrySelector';
import { COUNTRIES } from "./../../../lib/countries";

// helper split "a, b, c" -> ['a','b','c']
const parseList = (s) => (s || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

// ====== Image helpers ======
const MAX_DIM = 512;           // max width/height
const TARGET_KB = 128;         // kira-kira target ukuran file akhir
const MAX_FILE_MB = 5;         // batas file input mentah (sebelum kompres)

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
        // URL.revokeObjectURL(url); // bisa diaktifkan kalau mau strict cleanup
    }
}

function drawToCanvas(img, maxDim = MAX_DIM) {
    const { width, height } = img;
    const scale = Math.min(1, maxDim / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
}

/**
 * Kompres ke WebP dengan menurunkan kualitas sampai mendekati TARGET_KB.
 * Return: dataURL (string)
 */
async function compressImageFile(file, {
    maxDim = MAX_DIM,
    targetKB = TARGET_KB,
} = {}) {
    const img = await fileToImage(file);
    const canvas = drawToCanvas(img, maxDim);

    // coba dari kualitas 0.9 turun sampai 0.5
    const qualities = [0.9, 0.8, 0.7, 0.6, 0.5];
    let best = canvas.toDataURL('image/webp', 0.9);

    for (const q of qualities) {
        const dataUrl = canvas.toDataURL('image/webp', q);
        const sizeKB = Math.ceil((dataUrl.length * 3) / 4 / 1024); // approx base64 size
        best = dataUrl;
        if (sizeKB <= targetKB) break;
    }
    return best;
}

export default function GeneralInfoComponent({ initial, onSubmit, submitting }) {
    // initial = user (object biasa) dari canister
    const social = fromOpt(initial?.socialHandle, null);
    const skill = fromOpt(initial?.skillSet, null);

    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState('');

    const [form, setForm] = useState({
        email: initial?.email || '',
        fullName: initial?.fullName || '',
        jobTitle: initial?.jobTitle || '',
        location: initial?.location || '',

        phoneNumber: fromOpt(initial?.phoneNumber, ''),
        profilePicture: fromOpt(initial?.profilePicture, ''), // bisa URL atau dataURL

        discord: social ? fromOpt(social.discord, '') : '',
        telegram: social ? fromOpt(social.telegram, '') : '',
        personalWebsites: social ? (fromOpt(social.personalWebsites, []) || []) : [],

        primaryRole: skill ? (fromOpt(skill.primaryRole, []) || []) : [],
        yearsOfExperience: skill ? fromOpt(skill.yearsOfExperience, '') : '',
        techStack: skill ? (fromOpt(skill.techStack, []) || []) : [],
        languageSpoken: skill ? (fromOpt(skill.languageSpoken, []) || []) : [],
    });

    const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr('');

        if (!form.location) {
            setErr('Please select your country.');
            return;
        }
        onSubmit(form);
    };

    const onPickFile = async (file) => {
        setUploadErr('');
        if (!file) return;
        if (!/^image\//.test(file.type)) {
            setUploadErr('File harus gambar (JPEG/PNG/WebP).');
            return;
        }
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
            setUploadErr(`Ukuran file maksimal ${MAX_FILE_MB}MB.`);
            return;
        }
        try {
            setUploading(true);
            const dataUrl = await compressImageFile(file, { maxDim: MAX_DIM, targetKB: TARGET_KB });
            set('profilePicture', dataUrl);
        } catch (e) {
            setUploadErr(e?.message || 'Gagal memproses gambar.');
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
        e.target.value = ''; // reset supaya bisa upload file yang sama lagi
    };

    const clearPhoto = () => {
        set('profilePicture', '');
        setUploadErr('');
    };

    const previewSrc = form.profilePicture || '/images/default-avatar.png';

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Profile Picture Upload + (optional) URL */}
            <div className="grid gap-1">
                <span className="text-sm opacity-80">Profile Picture</span>

                {/* Preview */}
                <div className="flex items-center justify-center gap-3">
                    <img
                        src={previewSrc}
                        alt="Preview avatar"
                        className="w-[200px] aspect-square rounded-full object-cover border border-black/10"
                    />
                    {form.profilePicture && (
                        <button
                            type="button"
                            className="text-xs text-red-400 hover:text-red-300"
                            onClick={clearPhoto}
                        >
                            Remove
                        </button>
                    )}
                </div>

                {/* Dropzone + input file */}
                <div
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="mt-2 border border-dashed border-black/15 rounded-md p-3 text-sm flex items-center justify-between gap-3"
                >
                    <div className="opacity-80">
                        Drag & drop image here, or choose a file (auto-resize to {MAX_DIM}px)
                    </div>
                    <label className="px-3 py-1 rounded-md border border-black/10 bg-black/5 cursor-pointer">
                        {uploading ? 'Uploading…' : 'Choose File'}
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

                {/* (Opsional) URL manual sebagai fallback */}
                <input
                    className="mt-2 bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm"
                    placeholder="or paste an image URL (optional)"
                    value={form.profilePicture}
                    onChange={(e) => set('profilePicture', e.target.value)}
                />
                <span className="text-[11px] text-white/50">
                    Accepted: JPG/PNG/WebP. We store small, optimized images for avatars.
                </span>
            </div>

            {/* Required */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Email</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        required
                    />
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Full Name</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                        required
                    />
                </label>

                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Job Title</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.jobTitle}
                        onChange={(e) => set('jobTitle', e.target.value)}
                        required
                    />
                </label>

                {/* Location via CountrySelector */}
                <div className="grid gap-1">
                    <CountrySelector
                        id="country-selector"
                        open={isOpen}
                        isDark={false}
                        onToggle={() => setIsOpen(!isOpen)}
                        onChange={(val) => set('location', val)} // langsung ke form.location
                        selectedValue={COUNTRIES.find((option) => option.value === form.location) || null}
                    />
                    {err && <span className="text-xs text-red-400 mt-1">{err}</span>}
                </div>
            </div>

            {/* Optional simple */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Phone Number (optional)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.phoneNumber}
                        onChange={(e) => set('phoneNumber', e.target.value)}
                    />
                </label>


            </div>

            {/* Social */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Discord (optional)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.discord}
                        onChange={(e) => set('discord', e.target.value)}
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Telegram (optional)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.telegram}
                        onChange={(e) => set('telegram', e.target.value)}
                    />
                </label>
            </div>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Personal Websites (comma separated, optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.personalWebsites.join(', ')}
                    onChange={(e) => set('personalWebsites', parseList(e.target.value))}
                />
            </label>

            {/* Skill set */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Primary Role (comma separated, optional)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.primaryRole.join(', ')}
                        onChange={(e) => set('primaryRole', parseList(e.target.value))}
                    />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Years of Experience (optional)</span>
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={form.yearsOfExperience}
                        onChange={(e) => set('yearsOfExperience', e.target.value)}
                    />
                </label>
            </div>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Tech Stack (comma separated, optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.techStack.join(', ')}
                    onChange={(e) => set('techStack', parseList(e.target.value))}
                />
            </label>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Languages Spoken (comma separated, optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.languageSpoken.join(', ')}
                    onChange={(e) => set('languageSpoken', parseList(e.target.value))}
                />
            </label>

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white disabled:opacity-60"
                >
                    {submitting ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
}
