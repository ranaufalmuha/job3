import React from 'react'
import { CheckboxComponent } from '../../components/atoms/CheckboxComponent'
import { SalarySliderComponent } from '../../components/atoms/SalarySliderComponent'

export const JobSidebar = () => {
    const availabilityList = [
        { value: "urgent", name: "Urgent" },
        { value: "remote", name: "Remote" },
        { value: "full-time", name: "Full-Time" },
    ]

    const experienceLevelList = [
        { value: "internship", name: "Internship" },
        { value: "entry-level", name: "Entry Level" },
        { value: "associate", name: "Associate" },
        { value: "mid-senior-level", name: "Mid-Senior Level" },
        { value: "director", name: "Director" },
        { value: "executive", name: "Executive" },
    ]

    const skillList = [
        { value: "graphic-designer", name: "Graphic Designer" },
        { value: "ui-designer", name: "UI Designer" },
        { value: "ux-designer", name: "UX Designer" },
        { value: "developer", name: "Developer" },
    ]

    return (
        <section className="h-full pr-8 duration-300">
            <div className="flex flex-col gap-6 duration-300 ">
                <h2 className='base-bold text-xl'>Filter</h2>

                <SalarySliderComponent min={100} max={5000} />

                <div className="flex flex-col gap-4">
                    <h3 className='text-lg'>Availability</h3>
                    {availabilityList.map((item, index) => (
                        <CheckboxComponent key={index} index={index} title={"availibility"} item={item} />
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className='text-lg'>Experience</h3>
                    {experienceLevelList.map((item, index) => (
                        <CheckboxComponent key={index} index={index} title={"experience"} item={item} />
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className='text-lg'>Skill</h3>
                    {skillList.map((item, index) => (
                        <CheckboxComponent key={index} index={index} title={"skill"} item={item} />
                    ))}
                </div>
                <div className="h-24"></div>

            </div>
        </section>
    )
}

