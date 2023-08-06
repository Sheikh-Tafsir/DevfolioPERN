import React, {useState, useEffect, useContext}from 'react'
import {useNavigate} from "react-router-dom";
import "../../styles/Heromain.css"
import NavbarProfile from './NavbarProfile'
import PortfolioContext from '../../contexts/PortfolioContext';

const Heromain = () => {

  const[heroSlideClicked, setHeroSlideClicked] = useState(true);
  const {portfolio} = useContext(PortfolioContext);
  const [backgroundImageLink,setBaackgroundImageLink]=useState("");

  const navigate = useNavigate();

  useEffect(() => {

    if (Array.isArray(portfolio.about) && portfolio.about.length > 0) {
      setBaackgroundImageLink(portfolio.about[0].backgroundImageLink);
      //console.log(portfolio.about[0].backgroundImageLink);
    }
  }, [portfolio]);

  const slideHero = () => {
    setHeroSlideClicked(!heroSlideClicked);
    
    if(heroSlideClicked){
      document.querySelector(".hero-writings").classList.add("hero-writings-slide-left");
    }
    else{
      document.querySelector(".hero-writings").classList.remove("hero-writings-slide-left");
    }
  }


  return (
    <div className="heromain" id="home" style={{ backgroundImage: `url(${backgroundImageLink})` }}>
        <NavbarProfile/>
        <div className="text-white w-2/3 lg:w-1/3 lg:ml-40 hero-writings" data-aos="fade-up">
            <div className="flex text-lg lg:text-sm 2xl:text-lg mb-3"><p className="bg-orange-600 mr-1 p-hello rounded-sm">Hello</p><p>I'm</p></div>
            <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold  mb-2">{portfolio.name}</h1>
            <div className="flex text-2xl lg:text-3xl 2xl:text-4xl font-bold  mb-3"><p className="mr-2">Software</p><p className="text-orange-600">Engineer.</p></div>
            <p className="text-lg lg:text-sm 2xl:text-lg mb-6">Web developer with 1+ years experiencethat keep customers coming back for about sevices makes effort.</p>
            <button className="bg-orange-600 w-40 h-8 lg:w-24 lg:h-8 xl:w-32 xl:h-11 lg:text-sm 2xl:text-lg font-semibold pb-0.5 rounded-sm" onClick={slideHero}>Say Hello</button>
        </div>
    </div>
  )
}

export default Heromain