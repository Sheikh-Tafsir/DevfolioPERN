import React, {useEffect, useContext, useState, Suspense} from 'react';

import Axios from 'axios';
import HeromainProfile from './ProfileComponents/HeromainProfile'
import AboutProfile from './ProfileComponents/AboutProfile'
import ServiceProfile from './ProfileComponents/ServiceProfile'
import ProjectsProfile from './ProfileComponents/ProjectsProfile'
import ContactsProfile from './ProfileComponents/ContactsProfile'
import Footer from './Footer'
import Loading from './Loading';
//import NameContext from '../contexts/NameContext';
import  PortfolioContext from '../contexts/PortfolioContext';


const Profile = () => {
  //const {name,setName} = useContext(NameContext);
  const [loading, setLoading] = useState(true);
  let name=localStorage.getItem("localStorageUsername");
  // let token = localStorage.getItem('token');
  const {setPortfolio} = useContext(PortfolioContext);

  // const handleSetName = (name) => {
  //     setName(name);
  // };

  const savePortfolio = async (name) => {
  //alert(name);
    // alert(token);
    const apipath= `${process.env.REACT_APP_API_URI}/user/portfolio`;
    try {
      await Axios.post(apipath,{
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

  if (loading) {
    return(
      <Loading/>
    );
  }
  
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
