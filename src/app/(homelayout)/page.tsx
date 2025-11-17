import ClientReviews from '@/components/homepage/ClientReviews'
import HeroSection from '@/components/homepage/HeroSection'
import HowItWorks from '@/components/homepage/HowItWorks'
import TemplatesGrid from '@/components/homepage/TemplatesGrid'
import WhyUs from '@/components/homepage/WhyUs'
import React from 'react'

export default function page() {
    return (
        <div className=''>
            <HeroSection />
            <TemplatesGrid />
            <WhyUs />
            <HowItWorks />
            <ClientReviews />
        </div>
    )
}
