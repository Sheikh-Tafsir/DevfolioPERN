import React from 'react'
import {useNavigate} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "../../styles/HeromainHome.css"
// import Navbar from './Navbar'

const HeromainHome = () => {

    const navigate = useNavigate();

    const goToLogin = () =>{
        navigate("/login");
    }

  return (
    <div className="heromainHome" id="home">
        {/* <Navbar/> */}
        <div className="text-white w-2/3 lg:w-1/3 lg:ml-40 hero-writings" data-aos="fade-up">
            <div className="flex text-lg lg:text-sm 2xl:text-lg mb-3"><p className="bg-orange-600 mr-1 p-hello rounded-sm">Hello!</p><p>Wanna</p></div>
            <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold  mb-2">Create</h1>
            <div className="flex text-2xl lg:text-3xl 2xl:text-4xl font-bold  mb-3"><p className="mr-2">Your</p><p className="text-orange-600">Portfolio?</p></div>
            <p className="text-lg lg:text-sm 2xl:text-lg mb-6">Create your portfolio and showcase your talent expertiese and sevices that attracts peoples attention.</p>
            <Button className="bg-orange-600 w-40 h-8 lg:w-24 lg:h-8 xl:w-32 xl:h-11 lg:text-sm 2xl:text-lg font-semibold pb-0.5 rounded-sm" onClick={goToLogin}>Login Now</Button>
        </div>
    </div>
  )
}

export default HeromainHome