import React from 'react'
import HomeSlider from './homeslider/HomeSlider'
import Banner from './banner/Banner'
import Collections from './collections/Collections'

export default function Home() {
    return (
        <div>
            <HomeSlider />
            <Banner />
            <Collections />
        </div>
    )
}
