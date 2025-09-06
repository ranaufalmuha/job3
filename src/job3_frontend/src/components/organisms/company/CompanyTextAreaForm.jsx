import React, { useState } from 'react'

export const CompanyTextAreaForm = ({ initialText, submitting, onSubmit, placeholder }) => {
    const [text, setText] = useState(initialText || "");
    const submit = (e) => {
        e.preventDefault();
        onSubmit(text);
    };
    return (
        <form onSubmit={submit} className="flex flex-col gap-4 text-sm">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="px-3 py-2 rounded-md bg-black/5 border border-black/10 min-h-[160px] outline-none"
                placeholder={placeholder || "Write here..."}
            />
            <div className="flex items-center justify-end gap-3">
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md text-white bg-highlight disabled:opacity-50"
                >
                    {submitting ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}
