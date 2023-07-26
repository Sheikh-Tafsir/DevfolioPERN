import React, {useEffect, useContext} from 'react';

import Axios from 'axios';
import HeromainProfile from './ProfileComponents/HeromainProfile'
import AboutProfile from './ProfileComponents/AboutProfile'
import ServiceProfile from './ProfileComponents/ServiceProfile'
import ProjectsProfile from './ProfileComponents/ProjectsProfile'
import ContactsProfile from './ProfileComponents/ContactsProfile'
import Footer from './Footer'
//import NameContext from '../contexts/NameContext';
import  PortfolioContext from '../contexts/PortfolioContext';

const Profile = () => {
  //const {name,setName} = useContext(NameContext);
  let name=localStorage.getItem("localStorageUsername");
  const {setPortfolio} = useContext(PortfolioContext);

  // const handleSetName = (name) => {
  //     setName(name);
  // };

  const savePortfolio = async (name) => {
  
    try {
      await Axios.post('http://localhost:8080/user/portfolio',{
        name:name,
      }).then((response) =>{
        //console.log(response.data.data.userEntity);
        if(response.data.message === "user found")setPortfolio(response.data.data.userEntity);
      });
    } 
    catch (error) {
      console.error('Error while saving object:', error);
    }
  };

  useEffect(() => {
    savePortfolio(name);
  }, [name]);

  return (
    <>
      <HeromainProfile/>
      <AboutProfile/>
      <ServiceProfile/>
      <ProjectsProfile/>
      <ContactsProfile/>
      <Footer/>
    </>
  )
}

export default Profile