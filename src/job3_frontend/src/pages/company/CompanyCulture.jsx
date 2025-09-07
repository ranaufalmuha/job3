import React, { useEffect, useState } from 'react'
import { ModalComponent } from '../../components/molecules/ModalComponent';
import { fromOpt, optFromStr } from '../../utils/candidOpt';
import { useAuth } from '../../contexts/AuthContext';
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon } from "@hugeicons/core-free-icons";
import { CompanyTextAreaForm } from '../../components/organisms/company/CompanyTextAreaForm';

export const CompanyCulture = ({ company, onUpdated, readOnly = false }) => {
    const { authenticatedActor } = useAuth();

    const [data, setData] = useState(company);
    useEffect(() => setData(company), [company]);
    const [editor, setEditor] = useState(null); // 'overview' | 'whatWeDo' | 'culture' | null
    const [saving, setSaving] = useState(false);

    const about = fromOpt(data?.companyAbout, null);
    const culture = about ? fromOpt(about.culture, "") : "";
    const SectionHeader = ({ title, onEdit }) => (
        <div className="flex items-center gap-2">
            <h2 className="text-2xl base-bold">{title}</h2>
            {!readOnly && onEdit && (
                <button
                    onClick={onEdit}
                    className="text-sm p-2 rounded-md bg-transparent hover:bg-black/5 transition"
                >
                    <HugeiconsIcon icon={Edit03Icon} />
                </button>
            )}
        </div>
    );

    const handleSaveCulture = async (text) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updateCompanyCulture(optFromStr(text));
            if (res?.ok) {
                setData(res.ok);
                onUpdated?.(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === "string" ? res.err : JSON.stringify(res.err)) : "Unknown error";
                alert("Failed to update: " + msg);
            }
        } catch (e) {
            alert("Failed to update: " + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="text-lg">
            <section className="flex flex-col gap-6">
                <SectionHeader title="Culture" onEdit={!readOnly ? () => setEditor("culture") : undefined} />
                <p className="text-description">
                    {culture || "No description yet."}
                </p>
            </section>


            <ModalComponent
                open={editor === "culture"}
                title="Edit: Culture"
                onClose={() => setEditor(null)}
            >
                <CompanyTextAreaForm
                    initialText={culture}
                    submitting={saving}
                    onSubmit={handleSaveCulture}
                    placeholder="Describe your company culture..."
                />
            </ModalComponent>
        </div>
    );
}
