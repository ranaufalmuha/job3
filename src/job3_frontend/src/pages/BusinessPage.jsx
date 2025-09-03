import React, { useEffect } from 'react'
import { BusinessSection1 } from '../components/organisms/business/BusinessSection1'
import { BusinessSection2 } from '../components/organisms/business/BusinessSection2'
import { BusinessSection3 } from '../components/organisms/business/BusinessSection3'
import { BusinessSection4 } from '../components/organisms/business/BusinessSection4'

export const BusinessPage = () => {
    useEffect(() => {
        async function fetchData() {
            window.scrollTo(0, 0);
        }

        fetchData();
    }, []);

    return (
        <div>
            <BusinessSection1 />
            <BusinessSection2 />
            <BusinessSection3 />
            <BusinessSection4 />
            <div className="h-48"></div>
        </div>
    )
}
