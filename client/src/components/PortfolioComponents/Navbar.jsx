import React,{useState} from 'react'
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import {RxHamburgerMenu} from "react-icons/rx"
import '../../App.css';
import '../../styles/Navbar.css'

const Navbar = () => {
  const[navHamburgerClicked,setNavHamburgerClicked] = useState(true);
 
  window.addEventListener("scroll",function(){
    document.querySelector(".headnavbar").classList.toggle("sticky-headnavbar",window.scrollY > 80);
  });
  const navbarChange = () =>{
    setNavHamburgerClicked(!navHamburgerClicked);
    if(navHamburgerClicked){
      document.querySelector(".navbar").classList.add("navbar-down");
      document.querySelector(".headnavbar").classList.add("headnavbar-down");
    }
    else{
      document.querySelector(".navbar").classList.remove("navbar-down");
      document.querySelector(".headnavbar").classList.remove("headnavbar-down");
    }
  };

  return (
    
    <div className="flex text-sm lg:text-sm 2xl:text-lg z-10 headnavbar">
      <div className="w-1/2">
        <Link to="/"><img src={Logo} alt="logo" className="w-50 lg:w-1/3 h-2/3 lg:ml-40 mt-3"></img></Link>
        <RxHamburgerMenu className="sm:invisible hamburger" onClick={navbarChange}/>
      </div>
      <div className="w-1/2 text-white font-semibold">
        <div className="flex flex-col sm:flex-row sm:justify-between w-2/3 lg:mt-5 2xl:mt-6 navbar" >
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#service">Service</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contacts">Contact Me</a>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar