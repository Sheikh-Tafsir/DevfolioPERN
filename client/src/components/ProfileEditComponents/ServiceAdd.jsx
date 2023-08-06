import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import '../../styles/FeaturesAdd.css'

const ServiceAdd = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [serviceAddStatus, setServiceAddStatus] = useState("");
    let localStorageUserId = localStorage.getItem("localStorageUserId");

    const navigate = useNavigate();
    
    const addService = () => {
      if(name == "" || name == null || name === undefined ){
        setServiceAddStatus("Service name is empty");
      }
      else if(description === "" || description == null || description === undefined ){
        setServiceAddStatus("Service description is empty");
      }
      else{
        console.log("1");
        const apipath = `${process.env.REACT_APP_API_URI}/service/create`;
        //const apipath = `http://localhost:3001/service/create`;
        Axios.post(apipath,
        {
          userId:localStorageUserId,
          name:name,
          description:description,
        }
        ).then((response) =>{
         
            if(response.data){
                setServiceAddStatus("Service data saved");
                
                setTimeout(() => {
                  navigate("/profile");
              }, 800);
                
            }
            else{
                setServiceAddStatus(response.data);
            }
        }).catch(error => {

            if (error.response && error.response.status === 400) {
                setServiceAddStatus("service already exists");
            } else {
                console.log('Error:', error.message);
            }
        });
      }
    }

    // if (loading) {
    //   return(
    //     <Loading/>
    //   );
    // }

  return (
    <div className="flex flex-col justify-center items-center featuresAdd">
        <form className="w-6/7 lg:w-2/6 text-white flex flex-col featuresAddForm">
            <h1 className="text-2xl lg:text-2xl 2xl:text-4xl mx-auto pt-8 pb-6">Add Serivce</h1>
            <p>Service Name:</p>
            <input type="text" className="lg:text-xs 2xl:text-base" placeholder="Example12" onChange={(event) => {setName(event.target.value);} }/>
            <p>Service Description:</p>
            <textarea type="text" className="lg:text-xs 2xl:text-base lg:h-20 2xl:h-40 pt-2" placeholder="example description" onChange={(event) => {setDescription(event.target.value);} }/>
            <p className="mx-auto mb-4 text-red-600">{serviceAddStatus}</p>
            {/* <Button className="mx-auto mb-10 text-white w-3/4 h-10 feature-save-button" onClick={()=>addService}>Save</Button> */}
            <Button className="mx-auto mb-10 text-white w-3/4 h-10 feature-save-button" onClick={addService}>Save</Button>
        </form>
    </div>
  )
}

export default ServiceAdd