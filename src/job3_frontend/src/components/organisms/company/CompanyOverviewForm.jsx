import React, { useMemo, useState } from "react";
import { COUNTRIES } from "../../../lib/countries";
import CountrySelector from "../../atoms/CountrySelector";
import { fromOpt, optFromStr } from "../../../utils/candidOpt";

// asumsi: kamu sudah punya util ini di project mu
// const optFromStr = (s?: string) => (s && s.trim().length ? [s.trim()] : []); // contoh

export const CompanyOverviewForm = ({ initial, submitting, onSubmit }) => {
    const about = fromOpt(initial?.companyAbout, null);

    const [isOpen, setIsOpen] = useState(false);
    const [website, setWebsite] = useState(fromOpt(initial?.website, ""));
    const [industry, setIndustry] = useState(about ? fromOpt(about.industry, "") : "");
    const [specialties, setSpecialties] = useState(about ? fromOpt(about.specialties, "") : "");
    // const [companySize, setCompanySize] = useState(about ? fromOpt(about.companySize, "") : "");
    const rawCompanySize = about ? fromOpt(about.companySize, "") : "";
    const [location, setLocation] = useState(initial?.location || "");
    const [aboutUs, setAboutUs] = useState(about ? fromOpt(about.aboutUs, "") : "");
    const OTHER_VALUE = "OTHER";
    const COMPANY_SIZES = [
        { value: "Myself only", label: "Myself only" },
        { value: "2–10 employees", label: "2–10 employees" },
        { value: "11–50 employees", label: "11–50 employees" },
        { value: "51–200 employees", label: "51–200 employees" },
        { value: "201–500 employees", label: "201–500 employees" },
        { value: "501–1,000 employees", label: "501–1,000 employees" },
        { value: "1,001–5,000 employees", label: "1,001–5,000 employees" },
        { value: "5,001–10,000 employees", label: "5,001–10,000 employees" },
        { value: "10,001+ employees", label: "10,001+ employees" },
    ];

    const isPreset = useMemo(
        () => COMPANY_SIZES.some(o => o.value === rawCompanySize),
        [rawCompanySize]
    );

    const [companySizeChoice, setCompanySizeChoice] = useState(
        isPreset ? rawCompanySize : (rawCompanySize ? OTHER_VALUE : "")
    );
    const [companySizeCustom, setCompanySizeCustom] = useState(
        isPreset ? "" : rawCompanySize
    );

    const [err, setErr] = useState("");

    const submit = (e) => {
        e.preventDefault();
        setErr("");

        if (!location) {
            setErr("Please select your country.");
            return;
        }

        const finalCompanySize =
            companySizeChoice === OTHER_VALUE ? companySizeCustom : companySizeChoice;


        onSubmit({
            website: optFromStr(website),
            industry: optFromStr(industry),
            specialties: optFromStr(specialties),
            companySize: optFromStr(finalCompanySize),
            location: (location || "").trim(), // required (Text)
            aboutUs: optFromStr(aboutUs),
        });
    };

    const selectedCountry =
        COUNTRIES.find((option) => option.value === location) || null;

    return (
        <form onSubmit={submit} className="grid gap-4">
            {/* Location via CountrySelector (match user form) */}
            <div className="grid gap-1">
                <CountrySelector
                    id="company-country-selector"
                    open={isOpen}           // biarkan default; atau kelola state sendiri jika perlu
                    isDark={false}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={(val) => setLocation(val)}
                    selectedValue={selectedCountry}
                />
                {err && <span className="text-xs text-red-400 mt-1">{err}</span>}
            </div>

            {/* Website */}
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Website</span>
                <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    placeholder="https://example.com"
                />
            </label>

            {/* Industry + Company Size */}
            <div className="grid md:grid-cols-2 gap-3">
                <label className="grid gap-1">
                    <span className="text-sm opacity-80">Industry</span>
                    <input
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                        placeholder="Web3 / Protocol / NFT / etc."
                    />
                </label>

                <div className="grid gap-1">
                    <span className="text-sm opacity-80">Company Size</span>
                    <select
                        value={companySizeChoice}
                        onChange={(e) => {
                            const v = e.target.value;
                            setCompanySizeChoice(v);
                            if (v !== OTHER_VALUE) setCompanySizeCustom("");
                        }}
                        className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    >
                        <option value="">— Select company size —</option>
                        {COMPANY_SIZES.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                        <option value={OTHER_VALUE}>Other…</option>
                    </select>

                    {companySizeChoice === OTHER_VALUE && (
                        <input
                            value={companySizeCustom}
                            onChange={(e) => setCompanySizeCustom(e.target.value)}
                            className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                            placeholder="e.g., 12–15, micro team, etc."
                        />
                    )}
                </div>
            </div>

            {/* Specialties */}
            <label className="grid gap-1">
                <span className="text-sm opacity-80">Specialties</span>
                <input
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2"
                    placeholder="DeFi, AI Agents, Gaming, zk, ..."
                />
            </label>



            {/* About Us */}
            <label className="grid gap-1">
                <span className="text-sm opacity-80">About Us</span>
                <textarea
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                    className="bg-black/5 border border-black/10 rounded-md px-3 py-2 min-h-[120px]"
                    placeholder="Short description about your company..."
                />
            </label>

            {/* Submit */}
            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-md bg-highlight/90 hover:bg-highlight text-white disabled:opacity-60"
                >
                    {submitting ? "Saving…" : "Save changes"}
                </button>
            </div>
        </form>
    );
};
