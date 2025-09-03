import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { dateInputFromNs, nsFromDateInput } from '../../../utils/dates';
import { fromOpt, optFromStr } from '../../../utils/candidOpt';

// Preset employment types (kamu bisa ubah sesukamu)
const EMPLOYMENT_TYPES = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Freelance',
    'Internship',
    'Volunteer',
    'Temporary',
    'Self-Employed',
    'Other',
];

export const WorkExperience = ({ initial, onSubmit, submitting }) => {
    // Map dari tipe Motoko ke bentuk form (string dates + mode company + employment type)
    const toForm = (arr) =>
        (arr || []).map((w) => {
            // company: ?CompanyId -> [] | [Principal] -> Principal | null
            const cid = fromOpt(w?.company, null);
            const companyIdText = cid ? cid.toText() : '';
            // companyNamePlain: ?Text -> [] | [Text] -> string | ''
            const namePlain = fromOpt(w?.companyNamePlain, '') || '';
            // tentukan mode company
            const mode = companyIdText ? 'link' : namePlain ? 'custom' : '';

            // normalize employment type ke select
            const baseType = (w?.contributions || '').trim();
            const normalizedType = EMPLOYMENT_TYPES.includes(baseType) ? baseType : (baseType ? 'Other' : '');
            const otherText = normalizedType === 'Other' ? baseType : '';

            return {
                ...w,
                _companyMode: mode,            // 'link' | 'custom' | ''
                _companyId: companyIdText,     // string Principal
                _companyName: namePlain,       // plain text
                _startDate: dateInputFromNs(w?.startDate ?? 0n),
                _endDate: dateInputFromNs(w?.endDate ?? 0n),
                _employmentType: normalizedType, // salah satu dari EMPLOYMENT_TYPES atau ''
                _employmentOther: otherText,     // teks custom ketika Other
            };
        });

    const [items, setItems] = useState(() => toForm(initial));

    const change = (idx, v) => setItems((list) => list.map((it, i) => (i === idx ? v : it)));
    const remove = (idx) => setItems((list) => list.filter((_, i) => i !== idx));
    const add = () =>
        setItems((list) => [
            ...list,
            {
                jobTitle: '',
                responsibilities: '',
                // contributions diset via _employmentType/_employmentOther
                _employmentType: '',
                _employmentOther: '',
                _companyMode: '',
                _companyId: '',
                _companyName: '',
                _startDate: '',
                _endDate: '',
            },
        ]);

    const submit = (e) => {
        e.preventDefault();

        const payload = items.map((it) => {
            // Build company (optional Principal) & companyNamePlain (optional Text)
            let companyOpt = [];
            let companyNamePlainOpt = [];

            if (it._companyMode === 'link' && it._companyId.trim()) {
                try {
                    companyOpt = [Principal.fromText(it._companyId.trim())];
                } catch {
                    // jika Principal invalid, biarkan None
                    companyOpt = [];
                }
            } else if (it._companyMode === 'custom') {
                companyNamePlainOpt = optFromStr(it._companyName); // '' -> []; 'Acme' -> ['Acme']
            }

            // Employment type (contributions)
            let finalType = (it._employmentType || '').trim();
            if (finalType === 'Other') {
                finalType = (it._employmentOther || '').trim();
            }
            if (!finalType) finalType = 'Full-Time'; // fallback default

            return {
                company: companyOpt,                      // ?CompanyId
                companyNamePlain: companyNamePlainOpt,    // ?Text
                jobTitle: (it.jobTitle || '').trim(),
                startDate: nsFromDateInput(it._startDate),                 // BigInt ns
                endDate: it._endDate ? nsFromDateInput(it._endDate) : 0n,  // kosong -> 0n
                responsibilities: (it.responsibilities || '').trim(),
                contributions: finalType,
            };
        });

        onSubmit(payload);
    };

    return (
        <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4">
                {items.map((item, idx) => (
                    <WorkItem key={idx} idx={idx} item={item} onChange={change} onRemove={remove} />
                ))}
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={add}
                    className="px-3 py-2 rounded-md bg-black/5 border border-black/10"
                >
                    + Add Item
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-highlight/90 text-white hover:bg-highlight disabled:opacity-60"
                >
                    {submitting ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
};

const WorkItem = ({ idx, item, onChange, onRemove }) => {
    const set = (k, v) => onChange(idx, { ...item, [k]: v });

    return (
        <div className="rounded-lg border border-black/10 p-4 grid md:grid-cols-2 gap-3">
            {/* Job Title */}
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Job Title</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={item.jobTitle || ''}
                    onChange={(e) => set('jobTitle', e.target.value)}
                    required
                />
            </label>

            {/* Company mode (link vs custom) */}
            <div className="grid gap-1">
                <span className="text-sm opacity-80">Company</span>
                <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={`company-mode-${idx}`}
                            checked={item._companyMode === 'custom'}
                            onChange={() => set('_companyMode', 'custom')}
                        />
                        Custom
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={`company-mode-${idx}`}
                            checked={item._companyMode === 'link'}
                            onChange={() => set('_companyMode', 'link')}
                        />
                        Link Company
                    </label>
                </div>

                {item._companyMode === 'custom' && (
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2 mt-2"
                        placeholder="Enter company name"
                        value={item._companyName || ''}
                        onChange={(e) => set('_companyName', e.target.value)}
                    />
                )}

                {item._companyMode === 'link' && (
                    <input
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2 mt-2"
                        placeholder="Enter CompanyId (Principal)"
                        value={item._companyId || ''}
                        onChange={(e) => set('_companyId', e.target.value)}
                    />
                )}


            </div>

            {/* Start / End Date */}
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Start Date</span>
                <input
                    type="date"
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={item._startDate || ''}
                    onChange={(e) => set('_startDate', e.target.value)}
                    required
                />
            </label>
            <label className="grid gap-1">
                <span className="text-sm opacity-80">End Date</span>
                <input
                    type="date"
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={item._endDate || ''}
                    onChange={(e) => set('_endDate', e.target.value)}
                />
            </label>

            {/* Responsibilities */}
            <label className="grid gap-1 md:col-span-2">
                <span className="text-sm opacity-80">Responsibilities</span>
                <textarea
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2 min-h-[80px]"
                    value={item.responsibilities || ''}
                    onChange={(e) => set('responsibilities', e.target.value)}
                    required
                />
            </label>

            {/* Employment Type (Contributions) */}
            <div className="grid gap-1 md:col-span-2">
                <span className="text-sm opacity-80">Employment Type</span>
                <div className="grid md:grid-cols-2 gap-3">
                    <select
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        value={item._employmentType || ''}
                        onChange={(e) => set('_employmentType', e.target.value)}
                        required
                    >
                        <option value="" disabled>Choose type…</option>
                        {EMPLOYMENT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>

                    {item._employmentType === 'Other' && (
                        <input
                            className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                            placeholder="Please specify (e.g., Apprenticeship)"
                            value={item._employmentOther || ''}
                            onChange={(e) => set('_employmentOther', e.target.value)}
                            required
                        />
                    )}
                </div>
            </div>

            {/* Remove */}
            <div className="flex justify-end md:col-span-2">
                <button
                    type="button"
                    onClick={() => onRemove(idx)}
                    className="text-red-400 hover:text-red-300"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
