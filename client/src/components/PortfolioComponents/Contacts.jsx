import React,{useState, useEffect, useContext} from 'react'
import '../../styles/Contacts.css'
import {FaFacebookF} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaLinkedinIn} from "react-icons/fa";
import { Link } from 'react-router-dom';
import PortfolioContext from '../../contexts/PortfolioContext';

const Contacts = () => {
    const {portfolio} = useContext(PortfolioContext);
    const [contactsData, setContactsData] = useState([]);

    useEffect(() => {
        if(portfolio.contacts){
            setContactsData(portfolio.contacts);
            //console.log(portfolio.contacts);
        }
    }, [portfolio.contacts]);

  return (
    <div className="lg:flex text-white lg:text-xs 2xl:text-sm contacts pt-5 lg:pt-20 pb-10" id="contacts">
        <div className="lg:w-1/2" data-aos="fade-right">
            {contactsData.map((curElem)=>{
                return(
                <div className="w-2/3 ml-12 lg:ml-30 2xl:ml-40 pt-10" key={curElem.id}>
                    <div className="flex text-3xl lg:text-3xl 2xl:text-4xl font-bold "><p>Contact</p><p className="text-orange-600 ml-3">Me</p></div>
                    <p className="mt-5 font-bold lg:text-sm 2xl:text-base">If you have any project in your mind</p>
                    <p className="mt-5 lg:text-sm 2xl:text-base">Web development encompasses the creation and management of websites and web applications. </p>
                    <p className="mt-5 lg:text-sm 2xl:text-base">{curElem.phoneNo}</p>
                    <p className="mt-1 lg:text-sm 2xl:text-base">{curElem.email}</p>
                    <p className="mt-1 lg:text-sm 2xl:text-base">Link Share and Subscribe</p>
                    <div className="flex mt-5 w-4/5 lg:w-1/2 2xl:w-2/5 justify-between">
                        <Link to={curElem.facebookLink} className=" h-8 w-8 lg:h-9 w-9 2xl:h-11 2xl:w-11 bg-orange-600 rounded-md flex justify-centet items-center"><FaFacebookF className="mx-auto lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"/></Link>
                        <Link to={curElem.instagramLink} className="lg:h-9 w-9 2xl:h-11 2xl:w-11 bg-orange-600 rounded-md flex justify-centet items-center"><FaGithub className="mx-auto lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"/></Link>
                        <Link to={curElem.githubLink} className="lg:h-9 w-9 2xl:h-11 2xl:w-11 bg-orange-600 rounded-md flex justify-centet items-center"><FaInstagram className="mx-auto lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"/></Link>
                        <Link to={curElem.linkedinLink} className="lg:h-9 w-9 2xl:h-11 2xl:w-11 bg-orange-600 rounded-md flex justify-centet items-center"><FaLinkedinIn className="mx-auto lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"/></Link>
                    </div>
                </div>
                )
            })}
        </div>
        <div className="lg:w-1/2 mt-20 lg:mt-0" >
            <form className="ml-12 lg:ml-0 w-100">
                <input placeholder="Your Full Name" className="lg:w-3/4 2xl:w-2/3 pl-4" type="text" id="name" name="name" required data-aos="fade-right" data-aos-delay="100"/><br/>
                <input placeholder="Your Contact Email" className="lg:w-3/4 2xl:w-2/3 pl-4" type="email" id="email" name="email" required data-aos="fade-right" data-aos-delay="200"/><br/>
                <input placeholder="Your Project topic" className="lg:w-3/4 2xl:w-2/3 pl-4" type="text" id="sub" name="sub" required data-aos="fade-right" data-aos-delay="300"/><br/>
                <textarea placeholder="Project details" className="lg:w-3/4 2xl:w-2/3 h-40 pl-4 pt-2" id="message" name="message" required data-aos="fade-right" data-aos-delay="400"/><br/>
                <input className="bg-orange-600 w-40 h-10 rounded-md cursor-pointer" type="submit" value="Send Message"/>
            </form>
        </div>
    </div>
  )
}

export default Contacts