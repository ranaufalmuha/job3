// pages/company/CompanyAbout.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fromOpt, optFromStr } from "../../utils/candidOpt";
import { ModalComponent } from "../../components/molecules/ModalComponent";
import { useAuth } from "../../contexts/AuthContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon } from "@hugeicons/core-free-icons";
import { CompanyOverviewForm } from "../../components/organisms/company/CompanyOverviewForm";
import { CompanyTextAreaForm } from "../../components/organisms/company/CompanyTextAreaForm";

export const CompanyAbout = ({ company, onUpdated, readOnly = false }) => {
    const { authenticatedActor } = useAuth();

    // Local copy supaya UI langsung update setelah save
    const [data, setData] = useState(company);
    useEffect(() => setData(company), [company]);

    // Modal & saving state
    const [editor, setEditor] = useState(null); // 'overview' | 'whatWeDo' | 'culture' | null
    const [saving, setSaving] = useState(false);

    // ---- Derived fields (safe-optional) ----
    const about = fromOpt(data?.companyAbout, null);
    const website = fromOpt(data?.website, "-");
    const industry = about ? fromOpt(about.industry, "-") : "-";
    const specialties = about ? fromOpt(about.specialties, "-") : "-";
    const companySize = about ? fromOpt(about.companySize, "-") : "-";
    const aboutUs = about ? fromOpt(about.aboutUs, "") : "";
    const whatWeDo = about ? fromOpt(about.whatWeDo, "") : "";

    // ---- UI atoms ----
    const Row = ({ label, children }) => (
        <div className="flex max-md:flex-col gap-4">
            <label className="w-1/5 max-md:w-full">{label}</label>
            <div className="w-4/5 max-md:w-full text-description">{children}</div>
        </div>
    );

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

    // ---- Submit handlers ----
    const handleSaveOverview = async (payload) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updateCompanyOverview(payload);
            if (res?.ok) {
                setData(res.ok);
                onUpdated?.(res.ok);
                setEditor(null);
            } else {
                const msg = res?.err ? (typeof res.err === "string" ? res.err : JSON.stringify(res.err)) : "Unknown error";
                alert("Failed to update overview: " + msg);
            }
        } catch (e) {
            alert("Failed to update overview: " + (e?.message || String(e)));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveWhatWeDo = async (text) => {
        if (!authenticatedActor) return;
        setSaving(true);
        try {
            const res = await authenticatedActor.updateCompanyWhatWeDo(optFromStr(text));
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



    // ---- Forms in-modal (local components) ----


    // ---- Render ----
    return (
        <div className="text-lg flex flex-col gap-8">
            <section className="flex flex-col gap-6">
                <SectionHeader title="Company Overview" onEdit={!readOnly ? () => setEditor("overview") : undefined} />
                <div className="flex flex-col gap-4 capitalize">
                    <Row label="Website">
                        {website !== "-" ? (
                            <Link to={website} className="text-highlight underline lowercase">
                                {website}
                            </Link>
                        ) : (
                            <span>-</span>
                        )}
                    </Row>
                    <Row label="Industry">{industry}</Row>
                    <Row label="Specialities">{specialties}</Row>
                    <Row label="Company Size">{companySize}</Row>
                    <Row label="Primary Location">{data?.location || "-"}</Row>
                </div>
                {aboutUs && <p className="text-description">{aboutUs}</p>}
            </section>

            <section className="flex flex-col gap-6">
                <SectionHeader title="What We Do?" onEdit={!readOnly ? () => setEditor("whatWeDo") : undefined} />
                <p className="text-description">
                    {whatWeDo || "No description yet."}
                </p>
            </section>



            {/* ===== Modals ===== */}
            <ModalComponent
                open={editor === "overview"}
                title="Edit Company Overview"
                onClose={() => setEditor(null)}
            >
                <CompanyOverviewForm
                    initial={data}
                    submitting={saving}
                    onSubmit={handleSaveOverview}
                />
            </ModalComponent>

            <ModalComponent
                open={editor === "whatWeDo"}
                title="Edit: What We Do"
                onClose={() => setEditor(null)}
            >
                <CompanyTextAreaForm
                    initialText={whatWeDo}
                    submitting={saving}
                    onSubmit={handleSaveWhatWeDo}
                    placeholder="Describe what your company does..."
                />
            </ModalComponent>


        </div>
    );
};
