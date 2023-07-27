import React, {useEffect, useContext, useState, Suspense} from 'react';

import Axios from 'axios';
import HeromainProfile from './ProfileComponents/HeromainProfile'
import AboutProfile from './ProfileComponents/AboutProfile'
import ServiceProfile from './ProfileComponents/ServiceProfile'
import ProjectsProfile from './ProfileComponents/ProjectsProfile'
import ContactsProfile from './ProfileComponents/ContactsProfile'
import Footer from './Footer'
//import NameContext from '../contexts/NameContext';
import  PortfolioContext from '../contexts/PortfolioContext';

import "../styles/Profile.css"

const Profile = () => {
  //const {name,setName} = useContext(NameContext);
  const [loading, setLoading] = useState(true);
  let name=localStorage.getItem("localStorageUsername");
  const {setPortfolio} = useContext(PortfolioContext);

  // const handleSetName = (name) => {
  //     setName(name);
  // };

  const savePortfolio = async (name) => {
  //alert(name);
    const path= `${process.env.REACT_APP_API_URI}/user/portfolio`;
    //let token = localStorage.getItem('token');
    alert(path);
    //alert(token):
    try {
      await Axios.post(process.env.REACT_APP_API_URI +"/user/portfolio",{
        name:name,
      }).then((response) =>{
        //console.log(response);
        if(response.data.message === "user found"){
          setPortfolio(response.data.data.userEntity);
          setLoading(false);
        }
      });
    } 
    catch (error) {
      console.error('Error while saving object:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    savePortfolio(name);
  }, [name]);

  /*if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }*/
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeromainProfile/>
      <AboutProfile/>
      <ServiceProfile/>
      <ProjectsProfile/>
      <ContactsProfile/>
      <Footer/>
    </Suspense>
  )
}

export default Profile
