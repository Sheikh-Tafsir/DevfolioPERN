import React,{useState, useEffect, useContext} from 'react'
import '../../styles/About.css'
import PortfolioContext from '../../contexts/PortfolioContext';

const About = () => {
    const {portfolio} = useContext(PortfolioContext);
    const [aboutData, setAboutData] = useState([]);

    useEffect(() => {
        if(portfolio.about){
            setAboutData(portfolio.about);
            //console.log(portfolio.about[0].aboutImageLink);
        }
    }, [portfolio.about]);

  return (
    <>
        {aboutData.map((curElem)=>{
            return(
            <div className="pt-1 lg:pt-0 lg:flex pb-20 about" id="about" key={curElem.id}>
                <div className='lg:w-1/2' data-aos="fade-up" data-aos-delay="100">
                    <div className=" w-4/5 lg:w-2/3 ml-14 lg:ml-30 mt-10 lg:mt-28 2xl:mt-20" >
                        <img src={curElem.aboutImageLink} alt="about-imagee"></img>
                    </div>
                </div>
                <div className='lg:w-1/2 text-white' data-aos="fade-down" data-aos-delay="100">
                    <div className="w-4/5 lg:w-2/3 ml-10 lg:ml-0 lg:mt-25 2xl:mt-40" >
                        <div className="flex text-3xl lg:text-3xl 2xl:text-4xl font-bold mt-10 lg:mt-0"><p>About</p><p className="text-orange-600 ml-2">Me</p></div>
                        <p className="lg:text-xl 2xl:text-2xl font-bold mt-2">Creative {curElem.occupation}!</p>
                        <p className="mt-5 lg:text-sm 2xl:text-base">{curElem.description}.</p>
                        <button className="bg-orange-600 w-32 lg:w-24 h-8 lg:h-8 xl:w-32 xl:h-11 lg:text-sm 2xl:text-lg font-semibold pb-0.5 mt-10">More About</button>
                    </div>
                </div>
            </div>
            )
        })}
    </>
  )
}

export default About