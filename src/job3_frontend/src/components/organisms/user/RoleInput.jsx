import React, { useState, useRef } from 'react';

export default function RoleInput({
    value = [],
    onChange,
    placeholder = 'Add a role and press Enter',
    maxRoles = 5,
    maxLength = 50,
}) {
    const [draft, setDraft] = useState('');
    const [warn, setWarn] = useState('');
    const inputRef = useRef(null);

    const normalize = (s) => s.trim();
    const exists = (arr, v) => arr.some(x => x.toLowerCase() === v.toLowerCase());

    const setWarning = (msg) => {
        setWarn(msg);
        // hilangkan pesan setelah 2.5s
        if (msg) setTimeout(() => setWarn(''), 2500);
    };

    const commit = (raw) => {
        const pieces = String(raw)
            .split(/[,;]/)                 // dukung koma / titik koma
            .map(normalize)
            .filter(Boolean);

        if (!pieces.length) return;

        if (value.length >= maxRoles) {
            setWarning(`Maksimal ${maxRoles} role.`);
            setDraft('');
            return;
        }

        const next = [...value];
        let added = 0;
        const slots = maxRoles - value.length;

        for (const p of pieces) {
            if (added >= slots) {
                setWarning(`Maksimal ${maxRoles} role.`);
                break;
            }
            if (p.length > maxLength) {
                setWarning(`Setiap role maks ${maxLength} huruf.`);
                continue; // skip yang terlalu panjang
            }
            if (!exists(next, p)) {
                next.push(p);
                added++;
            }
        }

        if (added > 0) onChange(next);
        setDraft('');
    };

    const onKeyDown = (e) => {
        if (['Enter', 'Tab'].includes(e.key) || e.key === ',') {
            if (draft.trim() !== '') {
                e.preventDefault();
                commit(draft);
            }
        } else if (e.key === 'Backspace' && draft === '' && value.length) {
            onChange(value.slice(0, -1));
        }
    };

    const onPaste = (e) => {
        const text = e.clipboardData.getData('text');
        if (text && /[,;]/.test(text)) {
            e.preventDefault();
            commit(text);
        }
    };

    const removeAt = (i) => {
        const next = value.slice();
        next.splice(i, 1);
        onChange(next);
        inputRef.current?.focus();
    };

    return (
        <div className="grid gap-1">
            <div className="bg-black/5 border border-black/10 rounded-md px-2 py-2 flex flex-wrap gap-2">
                {value.map((r, i) => (
                    <span
                        key={`${r}-${i}`}
                        className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-highlight/15 text-highlight"
                    >
                        {r}
                        <button
                            type="button"
                            className="opacity-70 hover:opacity-100"
                            onClick={() => removeAt(i)}
                            aria-label={`Remove ${r}`}
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    ref={inputRef}
                    className="flex-1 min-w-[160px] bg-transparent outline-none text-sm px-1"
                    placeholder={placeholder}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    onPaste={onPaste}
                    onBlur={() => draft.trim() && commit(draft)}
                    maxLength={maxLength} // cegah lebih dari 50 saat ketik
                />
            </div>

            <div className="flex justify-between text-xs">
                <span className="text-red-400">{warn}</span>
                <span className="text-white/60">{value.length}/{maxRoles}</span>
            </div>
        </div>
    );
}
