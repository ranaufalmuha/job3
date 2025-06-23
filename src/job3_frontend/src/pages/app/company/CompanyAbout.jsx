import React from 'react'
import { Link } from 'react-router-dom'

export const CompanyAbout = () => {

    const HeaderComponent = ({ title }) => {
        return (
            <h2 className='text-2xl base-bold'>{title}</h2>
        )
    }

    const CompanyOverviewDetailComponent = ({ label, title, content }) => {
        return (
            <div className="flex max-md:flex-col gap-4">
                <label htmlFor={label} className='w-1/5 max-md:w-full'>{title}</label>
                <span className='w-4/5 max-md:w-full text-description'>{content}</span>
            </div>
        )
    }

    return (
        <div className='text-lg flex flex-col gap-8'>

            <section className='flex flex-col gap-6'>
                <HeaderComponent title={"Company Overview"} />
                {/* detail  */}
                <div className="flex flex-col gap-4">
                    <div className="flex max-md:flex-col gap-4">
                        <label htmlFor="Company Website Url" className='w-1/5 max-md:w-full'>Website</label>
                        <Link to={"https://dfinity.org"} className='w-4/5 max-md:w-full text-highlight underline'>https://dfinity.org</Link>
                    </div>
                    <CompanyOverviewDetailComponent label={"Company Industry"} title={"Industry"} content={"Retail & Consumer Products"} />
                    <CompanyOverviewDetailComponent label={"Company Specialities"} title={"Specialities"} content={"Beauty, Cosmetics, Personal care, Consumer products, Luxury, Innovation, Marketing, Retail"} />
                    <CompanyOverviewDetailComponent label={"Company Size"} title={"Company Size"} content={"More than 10,000"} />
                    <CompanyOverviewDetailComponent label={"Company Location"} title={"Primary Location"} content={"Melbourne, Australia"} />
                </div>

                <p className='text-description'>At L'Oréal, we share a common purpose to “create the beauty that moves the world”. We act to shape the future of beauty by leveraging the best of science and technology, increasingly inspired by nature, and to protect the beauty of the planet by fighting climate change, respecting biodiversity and preserving natural resources.</p>

                <p className='text-description'>We are an equal opportunity employer and encourage applications from people regardless of gender, ethnicity, religious beliefs or disability. If you require any adjustments or accommodations please email corpanz.accessibility@loreal.com to speak with our team. For any other enquiries, please contact recruitment.au@loreal.com.</p>
            </section>

            <section className='flex flex-col gap-6'>
                <HeaderComponent title={"Our mission statement"} />
                <p className='text-description'>Our goal is to offer each and every person around the world the best of beauty in terms of quality, efficacy, safety, sincerity and responsibility to satisfy all beauty needs and desires in their infinite diversity.</p>
            </section>
        </div>
    )
}
