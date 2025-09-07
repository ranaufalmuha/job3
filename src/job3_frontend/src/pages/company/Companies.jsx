import React from 'react'
import { CompanySection1 } from '../../components/organisms/company/CompanySection1'
import { CompanySection2 } from '../../components/organisms/company/CompanySection2'

export const Companies = () => {
    return (
        <div>
            <div className="h-20"></div>
            <CompanySection1 />
            <CompanySection2 />
        </div>
    )
}
