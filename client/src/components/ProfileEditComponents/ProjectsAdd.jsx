import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import '../../styles/FeaturesAdd.css'

const ProjectsAdd = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [technologies, setTechnologies] = useState();
    const [category, setCategory] = useState("Web");
    const [liveLink, setLiveLink] = useState();
    const [gitLink, setGitLink] = useState();
    const [imageLink,setImageLink] = useState();
    const [imageFile,setImageFile] = useState();
    const [projectAddStatus, setProjectAddStatus] = useState("");
    let localStorageUserId = localStorage.getItem("localStorageUserId");

    const navigate = useNavigate();

    //handle background image upload
    const handleProjectImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          //const dataURL = await uploadToImgbb(file);
          //setImageLink(dataURL);
          const dataURL = await imageToDataURL(file);
          setImageLink(dataURL);
          setImageFile(file);
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
        

    const addProject = async () => {
      //console.log(category);
      if(name === "" || name == null || name === undefined ){
        setProjectAddStatus("Project name is empty");
      }
      else if(description === "" || description == null || description === undefined ){
        setProjectAddStatus("Project description is empty");
      }
      else if(technologies === "" || technologies == null || technologies === undefined ){
        setProjectAddStatus("Project technologies is empty");
      }
      else if(category === "" || category == null || category === undefined ){
        alert(category);
        setProjectAddStatus("Project category is empty");
      }
      else if(liveLink === "" || liveLink == null || liveLink === undefined ){
        setProjectAddStatus("Project live link is empty");
      }
      else if(gitLink === "" || gitLink == null || gitLink === undefined ){
        setProjectAddStatus("Github link is empty");
      }
      else if(imageLink === "" || imageLink == null || imageLink === undefined ){
        setProjectAddStatus("Image link is empty");
      }
      else{
        
        const dataURL = await uploadToImgbb(imageFile);
        setImageLink(dataURL);
        alert(dataURL);
        
        const apipath = `${process.env.REACT_APP_API_URI}/project/create`;
        //const apipath = `http://localhost:3001/project/create`;
        await Axios.post(apipath,
        {
            userId:localStorageUserId,
            name:name,
            description:description,
            technologies:technologies,
            category:category,
            liveLink:liveLink,
            gitLink:gitLink,
            imageLink:dataURL,
        }
        ).then((response) =>{
            console.log(response.data);
            
            if(response.data){
              setProjectAddStatus("Project data saved");
              setTimeout(() => {
                navigate("/profile");
              }, 800);  
            }
            else{
              setProjectAddStatus("project saving failed");
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
              setProjectAddStatus("user already exists");
            } else {
                console.log('Error:', error.message);
            }
        });
        document.querySelector(".featureAddForm").reset();
      }
    }

  return (
    <div className="flex flex-col justify-center items-center featuresAdd">
        <form className="w-6/7 lg:w-2/5 text-white flex flex-col featuresAddForm">
            <h1 className="text-2xl lg:text-2xl 2xl:text-4xl mx-auto pt-8 pb-6">Add Project</h1>
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert Project Name" onChange={(event) => {setName(event.target.value);} }/>
            <div className="lg:flex select-categoty">
              <label className="w-1/2 lg:w-2/3 mt-3">Choose Project Type</label>
              <select className="h-12 outline-none text-white" value={category} onChange={(event) => {setCategory(event.target.value);}}>
                <option value="Web">Web App</option>
                <option value="App">Mobile App</option>
                <option value="Soft">Software</option>
                <option value="ml">Machine Learning</option>
              </select>
            </div>
            {/* <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert Project Image Link" onChange={(event) => {setImageLink(event.target.value);} }/> */}
            <p>Project Image</p>
            <input type="file" accept="image/*" className="pt-2 image-input" onChange={handleProjectImageUpload}/>
            {imageLink && <img src={imageLink} alt="Uploaded" className="h-10 w-10 mx-auto"/>}
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert Project Technologies" onChange={(event) => {setTechnologies(event.target.value);} }/>
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert Project Live Link" onChange={(event) => {setLiveLink(event.target.value);} }/>
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Insert Project Github Link" onChange={(event) => {setGitLink(event.target.value);} }/>
            <textarea type="text" className="lg:text-xs 2xl:text-base lg:h-20 2xl:h-40 pt-2" placeholder="Insert Project Description" onChange={(event) => {setDescription(event.target.value);} }/>
            <p className="mx-auto mb-4 text-red-600">{projectAddStatus}</p>
            <Button className="mx-auto mb-10 text-white w-3/4 h-10 feature-save-button" onClick={addProject}>Save</Button>
        </form>
    </div>
  )
}

export default ProjectsAdd