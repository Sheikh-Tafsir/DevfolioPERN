import React,{useState, useEffect, useContext} from 'react'
import "../../styles/Service.css"
import {BsPerson, BsCart3} from "react-icons/bs"
import PortfolioContext from '../../contexts/PortfolioContext';

const Service = () => {
    const {portfolio} = useContext(PortfolioContext);
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        if(portfolio.service){
            setServiceData(portfolio.service);
        }
    }, [portfolio.service]);

  return (
    <div className="service lg:pb-5 2xl:pb-10 text-white lg:text-xs 2xl:text-sm" id="service">
        <p className="flex justify-center pt-10 pb-2">What I am Expert in</p>
        <div className="flex justify-center text-3xl lg:text-3xl 2xl:text-4xl font-bold"><p className="text-orange-600 mr-3">My</p><p >Service</p></div>
        <div className="lg:flex flex-wrap justify-content w-4/5 mx-auto">
            {serviceData.map((curElem)=>{
                return(
                    <div className="services" key={curElem.id} data-aos="fade-right" data-aos-delay="500">
                        <BsPerson className="services-icons"/>
                        <p className="font-bold lg:text-base 2xl:text-lg mb-3">{curElem.name}</p>
                        <p className="lg:text-sm 2xl:text-base mb-3">{curElem.description} </p>
                        <button className="bg-orange-600 w-20 h-7 pb-0.5 mt-1 rounded-sm">Read Now</button>
                    </div>
                )
            })}
            {/* <div className="services" data-aos="fade-right" data-aos-delay="500">
                <BsPerson className="services-icons"/>
                <p className="font-bold lg:text-base 2xl:text-lg mb-3">Web Design</p>
                <p className="lg:text-sm 2xl:text-base mb-3">One way to categorize the activities in terms of the professional's area of expertise usch as competitive analysis corporate strategy </p>
                <button className="bg-orange-600 w-20 h-7 pb-0.5 mt-1 rounded-sm">Read Now</button>
            </div>
            <div className="services" data-aos="fade-right" data-aos-delay="300">
                <BsCart3 className="services-icons"/>
                <p className="font-bold lg:text-base 2xl:text-lg mb-3">Web Develeopment</p>
                <p className="lg:text-sm 2xl:text-base mb-3">One way to categorize the activities in terms of the professional's area of expertise usch as competitive analysis corporate strategy </p>
                <button className="bg-orange-600 w-20 h-7 pb-0.5 mt-1">Read Now</button>
            </div>
            <div className="services" data-aos="fade-right" data-aos-delay="100">
                <BsPerson className="services-icons"/>
                <p className="font-bold lg:text-base 2xl:text-lg mb-3">Creative Design</p>
                <p className="lg:text-sm 2xl:text-base mb-3">One way to categorize the activities in terms of the professional's area of expertise usch as competitive analysis corporate strategy </p>
                <button className="bg-orange-600 w-20 h-7 pb-0.5 mt-1">Read Now</button>
            </div> */}
        </div>
    </div>
  )
}

export default Service