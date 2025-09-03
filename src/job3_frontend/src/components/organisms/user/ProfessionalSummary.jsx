import React, { useState } from 'react'
import { optFromStr } from '../../../utils/candidOpt';

export const ProfessionalSummary = ({ initial, onSubmit, submitting }) => {
    const [form, setForm] = useState(() => ({
        bio: initial?.bio || '',
        careerObjective: initial?.careerObjective || '',
        resumeOrCV: initial?.resumeOrCV || '',
    }));
    const set = (k, v) => setForm(s => ({ ...s, [k]: v }));

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const payload = {
                    bio: form.bio,
                    careerObjective: optFromStr(form.careerObjective),
                    resumeOrCV: optFromStr(form.resumeOrCV),
                };
                onSubmit(payload);
            }}
            className="grid gap-4"
        >
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Bio</span>
                <textarea
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2 min-h-[120px]"
                    value={form.bio}
                    onChange={e => set('bio', e.target.value)}
                    placeholder="Brief professional bio"
                    required
                />
            </label>
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Career Objective (optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.careerObjective}
                    onChange={e => set('careerObjective', e.target.value)}
                    placeholder="What you aim to achieve next"
                />
            </label>
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Resume/CV URL (optional)</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={form.resumeOrCV}
                    onChange={e => set('resumeOrCV', e.target.value)}
                    placeholder="https://..."
                />
            </label>

            <div className="flex justify-end gap-2 pt-2 ">
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white transition disabled:opacity-60"
                >
                    {submitting ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
}
