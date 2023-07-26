import React from 'react'
import Heromain from './PortfolioComponents/Heromain'
import About from './PortfolioComponents/About'
import Service from './PortfolioComponents/Service'
import Projects from './PortfolioComponents/Projects'
import Contacts from './PortfolioComponents/Contacts'
import Footer from './Footer'

const Portfolio = () => {
    return (
        <>
          <Heromain/>
          <About/>
          <Service/>
          <Projects/>
          <Contacts/>
          <Footer/>
        </>
    )
}

export default Portfolio