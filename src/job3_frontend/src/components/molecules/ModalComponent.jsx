import React from 'react'

export const ModalComponent = ({ open, title, children, onClose }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div className="relative w-full max-w-2xl rounded-xl bg-white border border-black/10 shadow-xl overflow-y-auto overscroll-contain max-h-[85vh] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
                    <h3 className="text-lg base-bold">{title}</h3>
                    <button className="opacity-70 hover:opacity-100" onClick={onClose}>✕</button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
