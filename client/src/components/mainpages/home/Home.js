import React from 'react'
import HomeSlider from './homeslider/HomeSlider'
import Banner from './banner/Banner'
import Collections from './collections/Collections'
import Header from '../../headers/Header'
import Footer from '../../footers/Footer'

export default function Home() {
    return (
        <div>
            <Header />
            <HomeSlider />
            <Banner />
            <Collections />
            <Footer />
        </div>
    )
}
