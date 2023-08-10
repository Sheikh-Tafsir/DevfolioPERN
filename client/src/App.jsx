import React,{useState, useEffect, useContext} from 'react'
import {Routes, Route, BrowserRouter, useParams, Navigate} from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage';
import AOS from 'aos';
import Axios from 'axios';
import 'aos/dist/aos.css';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Loading from './components/Loading';

import { NameProvider } from './contexts/NameContext';
import  PortfolioContext, {PortfolioProvider } from './contexts/PortfolioContext';
import { UserProvider } from './contexts/UserContext';
import ProjectsAdd from './components/ProfileEditComponents/ProjectsAdd';
import ServiceAdd from './components/ProfileEditComponents/ServiceAdd';
import ContactsUpdate from './components/ProfileEditComponents/ContactsUpdate';
import AboutUpdate from './components/ProfileEditComponents/AboutUpdate';
import SearchUser from './components/SearchUser';


const App = () =>{

  // localStorage.setItem("localStorageUsername");
  // localStorage.setItem("localStorageUserId");
  let token = localStorage.getItem('token');

  const checkToken = () => (token == null || token == "null" || token == "undefined" || token == "");

  useEffect(() => {
    AOS.init();
    //console.log(token);
  }, []);

  return (
    
    <>
      <BrowserRouter>
       <NameProvider>
          <PortfolioProvider>
            <UserProvider>
              <Routes>
              <Route path="/" element={checkToken() ? <Homepage /> : <Navigate to="/profile" />} />
                <Route path="login" element={checkToken() ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={checkToken() ? <Signup /> : <Navigate to="/profile" />} />
                <Route path="/profile" element={checkToken() ? <Navigate to="/" /> : <Profile />} />
                <Route path="/profile/aboutupdate" element={checkToken() ? <Navigate to="/" /> : <AboutUpdate />} />
                <Route path="/profile/projectsadd" element={checkToken() ? <Navigate to="/" /> : <ProjectsAdd />} />
                <Route path="/profile/serviceadd" element={checkToken() ? <Navigate to="/" /> : <ServiceAdd />} />
                <Route path="/profile/contactsupdate" element={checkToken() ? <Navigate to="/" /> : <ContactsUpdate />} />
                <Route path="/portfolio/:name" element={<DynamicPage />} />
                <Route path="/searchuser" element={<SearchUser />} />
              </Routes>
            </UserProvider>
          </PortfolioProvider>
        </NameProvider>
      </BrowserRouter>
    </>
  )
}

const DynamicPage = () => {
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const {setPortfolio} = useContext(PortfolioContext);

  const savePortfolio = async (name) => {
    
    try {
      const apipath = `${process.env.REACT_APP_API_URI}/user/portfolio`;
      //const apipath = `http://localhost:3001/user/portfolio`;
      await Axios.post(apipath,{
        name:name,
      }).then((response) =>{
        //console.log(response.data.data.userEntity);
        if(response.data.message === "user found")setPortfolio(response.data.data.userEntity);
        setLoading(false);
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
      <>
          <Portfolio/>
      </>
  );
};



export default App;
