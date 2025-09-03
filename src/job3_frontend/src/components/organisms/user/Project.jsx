import React, { useState } from 'react'
import RoleInput from './RoleInput';

export const ProjectItem = ({ idx, item, onChange, onRemove }) => {
    const set = (k, v) => onChange(idx, { ...item, [k]: v });

    return (
        <div className="rounded-lg border border-black/10 p-4 grid md:grid-cols-2 gap-3">
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Title</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={item.title || ''}
                    onChange={e => set('title', e.target.value)}
                    required
                />
            </label>

            <label className="grid gap-1">
                <span className="text-sm opacity-80">Link</span>
                <input
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    value={item.link || ''}
                    onChange={e => set('link', e.target.value)}
                    placeholder="https://..."
                />
            </label>

            <div className="grid gap-1 md:col-span-2">
                <span className="text-sm opacity-80">Role(s)</span>
                <RoleInput
                    value={Array.isArray(item.role) ? item.role : []}
                    onChange={(roles) => set('role', roles)}
                    placeholder="e.g., Software Engineer — press Enter"
                />
            </div>

            <label className="grid gap-1 md:col-span-2">
                <span className="text-sm opacity-80">Short Description</span>
                <textarea
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2 min-h-[80px]"
                    value={item.shortDescription || ''}
                    onChange={e => set('shortDescription', e.target.value)}
                    required
                />
            </label>

            <div className="flex justify-end md:col-span-2">
                <button type="button" onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-300">
                    Remove
                </button>
            </div>
        </div>
    );
};

export const ProjectsForm = ({ initial, onSubmit, submitting }) => {
    const [items, setItems] = useState(() => initial || []);
    const change = (idx, v) => setItems(list => list.map((it, i) => (i === idx ? v : it)));
    const remove = (idx) => setItems(list => list.filter((_, i) => i !== idx));
    const add = () => setItems(list => [...list, { title: '', role: [], link: '', shortDescription: '' }]);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(items); }} className="grid gap-4">
            <div className="grid gap-4">
                {items.map((item, idx) => (
                    <ProjectItem key={idx} idx={idx} item={item} onChange={change} onRemove={remove} />
                ))}
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={add} className="px-3 py-2 rounded-md bg-black/5 border border-black/10">
                    + Add Item
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-highlight/90 text-white hover:bg-highlight disabled:opacity-60">
                    {submitting ? 'Saving…' : 'Save changes'}
                </button>
            </div>
        </form>
    );
};