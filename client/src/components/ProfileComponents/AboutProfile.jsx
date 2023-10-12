import React,{useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import '../../styles/About.css';
import PortfolioContext from '../../contexts/PortfolioContext'

const AboutProfile = () => {
    const {portfolio} = useContext(PortfolioContext);
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        //console.log(portfolio.about);
        console.log(aboutData);
        if(portfolio.about){
            setAboutData(portfolio.about);
            //console.log(portfolio.about[0].aboutImageLink);
        }
    }, [portfolio.about]);

  return (
    <div className="about">
        {/* <p className='bg-red-600 h-10'>hsjdhfjhsjkfhjkasf</p> */}
        
        {localStorage.getItem('token') != null ? (
            <Link to="/profile/aboutupdate" className='bg-red-600 h-10'>
                <FiEdit className="absolute right-6 lg:text-base 2xl:text-xl mt-4 text-white hover:text-red-200"/>
            </Link>
            ) : (
            <div></div>
        )}
        
        {aboutData != null ? 
            (aboutData.map((curElem)=>{
                return(
                <div className="pt-1 lg:pt-0 lg:flex pb-20" id="about" key={curElem.id}>
                    <div className='lg:w-1/2' data-aos="fade-up" data-aos-delay="100">
                        <div className=" w-4/5 lg:w-2/3 ml-14 lg:ml-30 mt-10 lg:mt-28 2xl:mt-20" >
                            <img src={curElem.aboutImageLink} alt="about-imagee"></img>
                        </div>
                    </div>
                    <div className='lg:w-1/2 text-white' data-aos="fade-down" data-aos-delay="100">
                        <div className="w-4/5 lg:w-2/3 ml-10 lg:ml-0 lg:mt-25 2xl:mt-40" >
                        <p className="flex  text-white lg:text-xs 2xl:text-sm pt-2 pb-2">Know about me</p>
                            <div className="flex text-3xl lg:text-3xl 2xl:text-4xl font-bold mt-10 lg:mt-0"><p>About</p><p className="text-orange-600 ml-2">Me</p></div>
                            <p className="lg:text-xl 2xl:text-2xl font-bold mt-2">Creative {curElem.occupation}!</p>
                            <p className="mt-5 lg:text-sm 2xl:text-base">{curElem.description}.</p>
                            <button className="bg-orange-600 w-32 lg:w-24 h-8 lg:h-8 xl:w-32 xl:h-11 lg:text-sm 2xl:text-lg font-semibold pb-0.5 mt-10">More About</button>
                        </div>
                    </div>
                </div>
                )
            })):
            (
                <div className="pt-1 lg:pt-0 lg:flex pb-20" id="about">
                    <div className='lg:w-1/2' data-aos="fade-up" data-aos-delay="100">
                        <div className=" w-4/5 lg:w-2/3 ml-14 lg:ml-30 mt-10 lg:mt-28 2xl:mt-20" >
                            <img src="" alt="about-imagee"></img>
                        </div>
                    </div>
                    <div className='lg:w-1/2 text-white' data-aos="fade-down" data-aos-delay="100">
                        <div className="w-4/5 lg:w-2/3 ml-10 lg:ml-0 lg:mt-25 2xl:mt-40" >
                        <p className="flex  text-white lg:text-xs 2xl:text-sm pt-2 pb-2">Know about me</p>
                            <div className="flex text-3xl lg:text-3xl 2xl:text-4xl font-bold mt-10 lg:mt-0"><p>About</p><p className="text-orange-600 ml-2">Me</p></div>
                            <button className="bg-orange-600 w-32 lg:w-24 h-8 lg:h-8 xl:w-32 xl:h-11 lg:text-sm 2xl:text-lg font-semibold pb-0.5 mt-10">More About</button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AboutProfile