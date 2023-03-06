import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Menu from './Menu'
import Hero from './Hero'
import Services from './Services'
const Layout = ({ pizzas }) => {
    return (
        <>
            <Header />
            <Hero />
            <Services />
            <Menu pizzas={pizzas} />
            <Footer />
        </>
    )
}

export default Layout
