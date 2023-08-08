import React,{useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import '../../styles/FeaturesAdd.css'
import Loading from '../Loading';

const AboutUpdate = () => {

    const [loading, setLoading] = useState(true);
    const [occupation, setOccupation] = useState("");
    const [description, setDescription] = useState("");
    const [backgroundImageLink, setBackgroundImageLink] = useState("");
    const [aboutImageLink, setAboutImageLink] = useState("");
    const [aboutUpdateStatus, setAboutUpdateStatus] = useState("");
    let localStorageUserId = localStorage.getItem("localStorageUserId");
  
    const [backgroundImage, setBackgroundImage] = useState();
    const [aboutImage, setAboutImage] = useState();

    const navigate = useNavigate();
    
    //check if user set about part
    const checkIfAboutExists = async () => {
      try {
        const apipath = `${process.env.REACT_APP_API_URI}/about/viewpersonal`;
        //const apipath = `http://localhost:3001/about/viewpersonal`;
        const response = await Axios.post(apipath, {
          userId: localStorageUserId,
        });
        //console.log(response.data);
    
        if (response.data) {
          if (response.data.occupation) setOccupation(response.data.occupation);
          if (response.data.description) setDescription(response.data.description);
          if (response.data.backgroundImageLink) setBackgroundImageLink(response.data.backgroundImageLink);
          if (response.data.aboutImageLink) setAboutImageLink(response.data.aboutImageLink);
        }
        setLoading(false);

      } 
      catch (error) {
        setAboutUpdateStatus("Error occurred while fetching old about data");
        setLoading(false);
      }
    };

    
    //handle about image upload
    const handleAboutImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const dataURL = await imageToDataURL(file);
          setAboutImageLink(dataURL);
          setAboutImage(file);
        } catch (error) {
          console.error('Error converting image to data URL:', error);
        }
      }
    };

    //handle background image upload
    const handleBackgroundImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const dataURL = await imageToDataURL(file);
          setBackgroundImageLink(dataURL);
          setBackgroundImage(file);
        } catch (error) {
          console.error('Error converting image to data URL:', error);
        }
      }
    };

    const imageToDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    //upload image to imgbb and get link
    const uploadToImgbb = async (file) => {
      //alert("2");
      try {
        
        const apiKey = process.env.IMGBB_API;
        const formData = new FormData();
        formData.append('image', file);

        const response = await Axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    
        if (response.data && response.data.data && response.data.data.url) {
          // alert(response.data.data.url);
          return response.data.data.url;
        } 
        else {
          console.log("Error shortening URL");
        }
      } 
      catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    
  
    //update about
    const updateAbout = async () => {
      // console.log(aboutImage);
      if(occupation === "" || occupation == null || occupation === undefined ){
        setAboutUpdateStatus("Your occupation empty");
      }
      else if(description === "" || description == null || description === undefined ){
        setAboutUpdateStatus("Your description is empty");
      }
      else if(backgroundImageLink === "" || backgroundImageLink == null || backgroundImageLink === undefined ){
        setAboutUpdateStatus("Your background image link is empty");
      }
      else if(aboutImageLink === "" || aboutImageLink == null || aboutImageLink === undefined ){
        setAboutUpdateStatus("Your about image link is empty");
      }
      else{
        var aboutImageURL = null;
        var backgroundImageURL = null;

        if(aboutImage === undefined || aboutImage == null){
          aboutImageURL = aboutImageLink; //if about image not selected use previous
        }
        else{
          aboutImageURL = await uploadToImgbb(aboutImage);
          setAboutImageLink(aboutImageURL);
        }

        if(backgroundImage === undefined || backgroundImage == null){
          backgroundImageURL = backgroundImageLink //if background image not selected use previous
        }
        else{
          backgroundImageURL = await uploadToImgbb(backgroundImage);
          setBackgroundImageLink(backgroundImageURL);
        }
        

        try{
            const apipath = `${process.env.REACT_APP_API_URI}/about/create`;
            //const apipath = `http://localhost:3001/about/create`;
            const response = await Axios.post(apipath,{
                userId:localStorageUserId,
                occupation: occupation,
                description: description,
                aboutImageLink: aboutImageURL,
                backgroundImageLink: backgroundImageURL,
            });
            //console.log(response.data);
            setAboutUpdateStatus(response.data.responseMessage);
            
            setTimeout(() => {
                navigate("/profile");
            }, 800);

        }
        catch(error) {
            setAboutUpdateStatus("Error occured while saving new about data"); 
        }; 
      }
      
    }
  
    
    
    useEffect(() => {
      checkIfAboutExists();
      //console.log(aboutImage);
    }, []);

    if (loading) {
      return(
        <Loading/>
      );
    }

  return (
    <div className="flex flex-col justify-center items-center featuresAdd">
        <form className="w-6/7 lg:w-2/5 2xl:w-2/6 text-white flex flex-col featuresAddForm">
            <h1 className="text-2xl lg:text-2xl 2xl:text-4xl mx-auto pt-8 pb-6">Update About</h1>
            <p>Designation:</p>
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="eg:Teacher" value={occupation} onChange={(event) => {setOccupation(event.target.value);} }/>
            <p>About:</p>
            <textarea type="text" className="lg:text-xs 2xl:text-base lg:h-40 2xl:h-52 pt-2" placeholder="Insert your description" value={description} onChange={(event) => {setDescription(event.target.value);} }/>
            <p>Background Image:</p>
            {/* <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert your background image link" value={backgroundImageLink} onChange={(event) => {setBackgroundImageLink(event.target.value);} }/> */}
            <input type="file" accept="image/*" className="pt-2 image-input" onChange={handleBackgroundImageUpload}/>
            {backgroundImageLink && <img src={backgroundImageLink} alt="Uploaded" className="h-10 w-10 mx-auto"/>}
            <p>About Image:</p>
            {/*<input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert your about image link" value={aboutImageLink} onChange={(event) => {setAboutImageLink(event.target.value);} }/> */}
            <input type="file" accept="image/*" className="pt-2 image-input" onChange={handleAboutImageUpload}/>
            {aboutImageLink && <img src={aboutImageLink} alt="Uploaded" className="h-10 w-10 mx-auto"/>}
            <p className="mx-auto mb-4 text-red-600">{aboutUpdateStatus}</p>
            <Button className="mx-auto mb-10 text-white w-3/4 h-10 feature-save-button" onClick={updateAbout}>Save</Button>
        </form>
    </div>
  )
}

export default AboutUpdate