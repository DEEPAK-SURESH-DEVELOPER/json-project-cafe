import React from 'react'
import CustomerHeader from '../../../components/UserComponents/CustomerHeader/CustomerHeader'
import Hero from './Hero/Hero'
import Experience from './Experience/Experience'
import About from './About/About'
import SignatureMenu from './SignatureMenu/SignatureMenu'
import CTA from './CTA/CTA'
import Footer from './Footer/Footer'

function Home() {
    return (
        <div>
            <CustomerHeader />
            <Hero />
            <Experience />
            <About/>
            <SignatureMenu/>
            <CTA/>
            <Footer/>

        </div>
    )
}

export default Home