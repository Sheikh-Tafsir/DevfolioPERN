import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../images/logo.png";
import {RxHamburgerMenu} from "react-icons/rx";
import { Button } from 'react-bootstrap';
import '../../App.css';
import '../../styles/Navbar.css'

const Navbar = () => {
  
  const[navHamburgerClicked,setNavHamburgerClicked] = useState(true);

  const navigate = useNavigate();
 
  window.addEventListener("scroll",function(){
    document.querySelector(".headnavbar").classList.toggle("sticky-headnavbar",window.scrollY > 80);
  });
  
  const navbarChange = () =>{
    setNavHamburgerClicked(!navHamburgerClicked);
    if(navHamburgerClicked){
      document.querySelector(".navbar").classList.add("navbar-down");
      document.querySelector(".navbar-extra").classList.add("navbar-extra-down");
      document.querySelector(".headnavbar").classList.add("headnavbar-down");
    }
    else{
      document.querySelector(".navbar").classList.remove("navbar-down");
      document.querySelector(".navbar-extra").classList.remove("navbar-extra-down");
      document.querySelector(".headnavbar").classList.remove("headnavbar-down");
    }
  };

  const logout = () => {
    localStorage.setItem("localStorageUsername",null);
    localStorage.setItem("token",null);
    localStorage.setItem("localStorageUserId",null);
    //navigate("/");
    window.open("/", "_top");
  }

  return (
    
    <div className="flex text-lg lg:text-sm 2xl:text-lg z-10 headnavbar">
      <div className="w-1/2">
        <Link to="/"><img src={Logo} alt="logo" className="w-50 lg:w-1/3 h-2/3 lg:ml-40 mt-3"></img></Link>
        <RxHamburgerMenu className="sm:invisible hamburger" onClick={navbarChange}/>
      </div>
      <div className="w-1/2 text-white font-semibold">
        <div className="flex flex-col sm:flex-row sm:justify-between w-4/5 lg:mt-5 2xl:mt-6 navbar" >
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#service">Service</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contacts">Contact Me</a>
          <Link to="/portfoliosearch">Search</Link>
          <Button className="bg-orange-600 h-10 lg:h-8 lg:w-16 2xl:h-12 2xl:w-20 rounded-lg transform -translate-y-2 logout-button" onClick={logout}>Logout</Button>
        </div>
        <div className="navbar-extra" onClick={navbarChange}>
    
        </div>
        
      </div>
    </div>
  )
}

export default Navbar