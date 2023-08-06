import React,{useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom";
import '../../styles/Projects.css'
import {BsPerson} from "react-icons/bs"
import {FiEdit} from "react-icons/fi";
//import Projectara from '../json/Projectara';
import PortfolioContext from '../../contexts/PortfolioContext';

const ProjectsProfile = () => {
    const {portfolio} = useContext(PortfolioContext);

    const [workData, setWorkData] = useState([]);
    const [hasRunEffect, setHasRunEffect] = useState(false);

    const filteritems = (category) =>{
        const updatedList = portfolio.projects.filter((curElem)=>{
            return curElem.category===category;
        })
        setWorkData(updatedList);        
    };

    useEffect(() => {
        //console.log(portfolio.projects);
        if (portfolio.projects && !hasRunEffect) {
          filteritems('Web'); // Filter for "Web" category initially
          setHasRunEffect(true);
          //console.log(portfolio.projects);
        }
      }, [portfolio.projects, hasRunEffect]);

  return (
    <div className="projects text-white lg:text-xs 2xl:text-sm pb-10" id="portfolio">
        {localStorage.getItem('token') != null ? (
            <Link to ="/profile/projectsadd">
                <FiEdit className="absolute right-6 lg:text-base 2xl:text-xl mt-4 hover:text-red-200"/>
            </Link>
            ) : (
            <div></div>
        )}
        <p className="flex justify-center pt-10 pb-2">Portfolio</p>
        <div className="flex justify-center text-3xl lg:text-3xl 2xl:text-4xl font-bold mb-10"><p className="text-orange-600 mr-3">Latest</p><p>Projects</p></div>
        
        <div className="flex justify-between w-3/5 lg:w-1/5 lg:h-8 2xl:h-12 mx-auto mb-5 font-bold lg:text-base 2xl:text-lg">
                {/* <button className="workmenubarbut" onClick={() => {setWorkData(Workar);}}>All</button> */}
                <button className="w-1/4 hover:bg-orange-600 rounded-md" onClick={() => {filteritems("Web");}}>Web</button>
                <button className="w-1/4 hover:bg-orange-600 rounded-md" onClick={() => {filteritems("App");}}>App</button>
                <button className="w-1/4 hover:bg-orange-600 rounded-md" onClick={() => {filteritems("Soft");}}>Soft</button>
                <button className="w-1/4 hover:bg-orange-600 rounded-md" onClick={() => {filteritems("ml");}}>ML</button>
        </div>

        <div className="flex flex-wrap justify-content w-5/6 lg:w-4/5 mx-auto">
            {workData.map((curElem)=>{
                return(
                <div className="project-card" key={curElem.id}>
                    <img src={curElem.imageLink} alt=""></img>
                    <div className="project-card-gradient pt-4 lg:p-6 lg:pt-4 2xl:p-12 2xl:pt-8">
                        <p className="font-bold text-base lg:text-base 2xl:text-lg mb-2">{curElem.name}</p>
                        <p className="text-sm lg:text-sm 2xl:text-base mb-3">{curElem.description}</p>
                        <p className="text-sm lg:text-sm 2xl:text-base mb-3">{curElem.technologies}</p>
                        <div className="flex w-1/2 mx-auto">
                            <div className="bg-white h-7 w-7 lg:h-7 lg:w-7 2xl:h-11 2xl:w-11 mx-auto rounded-full flex items-center justify-center">
                                <a href={curElem.liveLink}><BsPerson className="text-black" /></a>
                            </div>
                            <div className="bg-white h-7 w-7 lg:h-7 lg:w-7 2xl:h-11 2xl:w-11 mx-auto rounded-full flex items-center justify-center">
                                <a href={curElem.gitLink}><BsPerson className="text-black" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
 
    </div>
  )
}

export default ProjectsProfile