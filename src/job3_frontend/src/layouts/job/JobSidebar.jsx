import React, { useState } from 'react'
import { CheckboxComponent } from '../../components/atoms/CheckboxComponent'
import { SalarySliderComponent } from '../../components/atoms/SalarySliderComponent'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

export const JobSidebar = () => {
    const filter = [
        {
            name: "Job Type",
            value: "job-type",
            list: [
                { value: "full-time", name: "Full-time" },
                { value: "part-time", name: "Part-time" },
                { value: "contract", name: "Contract" },
                { value: "freelance", name: "Freelance" },
                { value: "bounty", name: "Bounty" },
            ],
        },
        {
            name: "Category",
            value: "category",
            list: [
                { value: "development", name: "Development" },
                { value: "marketing", name: "Marketing" },
                { value: "community", name: "Community" },
                { value: "design", name: "Design" },
                { value: "bizdev", name: "BizDev" },
                { value: "legal", name: "Legal" },
                { value: "content", name: "Content" },
            ],
        },
        {
            name: "Experience Level",
            value: "experience-level",
            list: [
                { value: "entry", name: "Entry" },
                { value: "intermediate", name: "Intermediate" },
                { value: "senior", name: "Senior" },
                { value: "dao-wizard", name: "DAO Wizard" },
            ],
        },
        {
            name: "Work Arrangement",
            value: "work-arrangement",
            list: [
                { value: "remote", name: "Remote" },
                { value: "hybrid", name: "Hybrid" },
                { value: "onsite", name: "Onsite" },
            ],
        },
        {
            name: "Location",
            value: "location",
            list: [
                { value: "country", name: "Country" },
                { value: "city", name: "City" },
                { value: "remote-first", name: "Remote-first" },
            ],
        },
        {
            name: "Pay Type",
            value: "pay-type",
            list: [
                { value: "usd", name: "USD" },
                { value: "crypto", name: "Crypto" },
                { value: "equity", name: "Equity" },
                { value: "combo", name: "Combo" },
            ],
        },
        {
            name: "Blockchain Ecosystem",
            value: "blockchain-ecosystem",
            list: [
                { value: "icp", name: "ICP" },
                { value: "ethereum", name: "Ethereum" },
                { value: "solana", name: "Solana" },
                { value: "polkadot", name: "Polkadot" },
                { value: "multichain", name: "Multichain" },
            ],
        },
        {
            name: "Contract Type",
            value: "contract-type",
            list: [
                { value: "smart-contract", name: "Smart Contract" },
                { value: "frontend", name: "Frontend" },
                { value: "zk", name: "ZK" },
                { value: "nft", name: "NFT" },
                { value: "infra", name: "Infra" },
                { value: "ai-x-web3", name: "AI x Web3" },
            ],
        },
        {
            name: "Tech Stack Required",
            value: "tech-stack",
            list: [
                { value: "motoko", name: "Motoko" },
                { value: "rust", name: "Rust" },
                { value: "solidity", name: "Solidity" },
                { value: "typescript", name: "Typescript" },
                { value: "hardhat", name: "Hardhat" },
                { value: "foundry", name: "Foundry" },
                { value: "dfx", name: "DFX" },
                { value: "etc", name: "etc." },
            ],
        },
        {
            name: "DAO vs Company",
            value: "dao-vs-company",
            list: [
                { value: "dao", name: "DAO" },
                { value: "startup", name: "Startup" },
                { value: "hybrid", name: "Hybrid" },
            ],
        },
        {
            name: "Hiring Speed",
            value: "hiring-speed",
            list: [
                { value: "immediate", name: "Immediate" },
                { value: "this-week", name: "This week" },
                { value: "open-to-talks", name: "Open to talks" },
            ],
        },
        {
            name: "Verified Jobs",
            value: "verified-jobs",
            list: [
                { value: "verified", name: "Verified by Job3" },
                { value: "featured", name: "Featured" },
                { value: "has-hired-before", name: "Has hired before" },
            ],
        },
        {
            name: "Tool Stack",
            value: "tool-stack",
            list: [
                { value: "figma", name: "Figma" },
                { value: "notion", name: "Notion" },
                { value: "slack", name: "Slack" },
                { value: "github", name: "GitHub" },
                { value: "etc", name: "etc." },
            ],
        },
        {
            name: "KOL Audience Size",
            value: "kol-audience-size",
            list: [
                { value: "micro", name: "Micro" },
                { value: "mid-tier", name: "Mid-tier" },
                { value: "macro", name: "Macro" },
                { value: "mega", name: "Mega" },
            ],
        },
        {
            name: "KOL Platform",
            value: "kol-platform",
            list: [
                { value: "x", name: "X" },
                { value: "youtube", name: "YouTube" },
                { value: "tiktok", name: "TikTok" },
                { value: "mirror", name: "Mirror" },
                { value: "farcaster", name: "Farcaster" },
            ],
        },
    ];

    const sections = ['Salary Range', ...filter.map(f => f.name)];

    const [openSections, setOpenSections] = useState(
        Object.fromEntries(sections.map(name => [name, false]))
    );

    // Fungsi toggle
    const toggleSection = name =>
        setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));

    return (
        <nav className="h-full pr-8 duration-300" aria-label="Job Filters">
            <div className="flex flex-col gap-6 duration-300 ">
                <h2 className='base-bold text-xl'>Filter</h2>

                <SalarySliderComponent min={100} max={5000} />

                {filter.map((item) => (
                    <section key={item.value} className='flex flex-col gap-4'>
                        <button
                            type="button"
                            aria-expanded={openSections[item.name]}
                            aria-controls={`${item.value}-content`}
                            className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
                            onClick={() => toggleSection(item.name)}
                        >
                            {item.name}
                            <HugeiconsIcon icon={ArrowDown01Icon} className={`transform transition-transform duration-300 ${openSections[item.name] ? '-rotate-180' : ''}`} />
                        </button>
                        <div
                            id={`${item.value}-content`}
                            className={`overflow-hidden transition-all duration-300 ${openSections[item.name] ? 'max-h-96' : 'max-h-0 py-0'}`}
                            aria-hidden={!openSections[item.name]}
                        >
                            <div className="flex flex-col gap-4">
                                {item.list.map((child, cidx) => (
                                    <CheckboxComponent
                                        key={child.value}
                                        index={cidx}
                                        title={item.value}
                                        item={child}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                <div className="h-24"></div>

            </div>
        </nav>
    )
}

