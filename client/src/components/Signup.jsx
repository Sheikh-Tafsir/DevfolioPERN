import React, { useState } from "react";
import Axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "../styles/Signup.css"
import {FaRegAddressBook} from "react-icons/fa"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [regStatus, setRegStatus] = useState("");

    const navigate = useNavigate();

    const signupUser = () => {
        
        setRegStatus("checking credentials...");
        
        if(username === "" || username == null || username === undefined){
            setRegStatus("Name is empty");
        }
        else if(useremail === "" || useremail == null || useremail === undefined){
            setRegStatus("Email is empty");
        }
        else if(!isValidEmail(useremail)){
            setRegStatus("Please provide a valid email address");
        }
        else if(password === "" || password == null || password === undefined){
            setRegStatus("password is empty");
        }
        else if(!isValidPassword(password)){
            setRegStatus("Password should be atleast 5 characters");
        }

        else{
            Axios.post('http://localhost:8080/user/signup',
            {
                name:username,
                email:useremail,
                password:password
            }
            ).then((response) =>{
                if(response.data){
                    setRegStatus("user data saved");
                    
                    localStorage.setItem("localStorageUsername",username);
                    localStorage.setItem("localStorageUserId",response.data.data.id);
                    localStorage.setItem('token', response.data.data.token)
                    
                    setTimeout(() => {
                        //navigate("/profile");
                        window.open("/profile", "_top");
                    }, 800);
                    
                }
                else{
                    setRegStatus(response.data);
                }
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    setRegStatus("user already exists");
                } else {
                    console.log('Error:', error.message);
                }
            });
            document.querySelector(".signupform").reset();
        }
        //alert("succ");
    }; 

    const isValidEmail = (useremail) => {
        // Regular expression pattern to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(useremail);
    };

    const isValidPassword = (password)=> {
        // Regular expressions to match at least 5 letters/numbers, at least 1 number, and at least 1 letter
        const letterNumberRegex = /[a-zA-Z0-9]/g;
        // const numberRegex = /[0-9]/g;
        // const letterRegex = /[a-zA-Z]/g;
        
        // Count the number of letters/numbers, numbers, and letters in the password
        const letterNumberCount = (password.match(letterNumberRegex) || []).length;
        // const numberCount = (password.match(numberRegex) || []).length;
        // const letterCount = (password.match(letterRegex) || []).length;
        
        // Check if the password meets the criteria
        //return letterNumberCount >= 5 && numberCount >= 1 && letterCount >= 1;
        return letterNumberCount>= 5;
    };
      

  return (
    <div className="signuppage">
            <form className="signupform">
                <h2>Signup Form</h2>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="text" id="name" name="name" placeholder="Insert name" value={username} onChange={(event) => {setUsername(event.target.value);} }/><br/>
                </div>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="text" id="email" name="email" placeholder="Insert email" value={useremail} onChange={(event) => {setUseremail(event.target.value);} }/><br/>
                </div>
                <div className="signupCreds">
                    <FaRegAddressBook className ="signupCredsIcons"/>
                    <input type="password" id="iid" name="iid" placeholder="Insert Your password" value={password} onChange={(event) => {setPassword(event.target.value);} }/><br/>
                </div>
                <p>{regStatus}</p><br/>
                <Button className="signupformbut" onClick={signupUser}>Signup</Button><br/>
                <Link to="/login" className='signToLog'>Already have an account</Link><br/>
            </form>
        </div>
  )
}

export default Signup