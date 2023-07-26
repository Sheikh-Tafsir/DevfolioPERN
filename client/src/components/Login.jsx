import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { Button } from 'react-bootstrap';
import "../styles/Login.css"
import {FaRegAddressBook} from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    
    const navigate = useNavigate();

  
    useEffect(() => {
        //console.log(loggedIn);
    });

    const loginUser = () => {       
        
        setLoginStatus("please wait...");
        
        if(username === "" || username == null || username === undefined){
            setLoginStatus("Name is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }

        // if(username==="sheikh" && password==="rub"){
        //      setLoginStatus("logging in");
        //      localStorage.setItem("localStorageUsername",username);
        //      localStorage.setItem("localStorageLoggedState",2);
        //      window.location.href = "/dashboardadmin";
        // }
        else{
            Axios.post('http://localhost:3001/user/login', 
            {
                name:username,
                password:password
            }
            ).then((response) =>{
                //alert(JSON.stringify(response.data));
                console.log(response);
                console.log(response.data);
                setLoginStatus("please wait");
                if(response.data){
                    setLoginStatus("logging in");
                    localStorage.setItem("localStorageUsername",username);
                    localStorage.setItem("localStorageUserId",response.data.data.id);
                    localStorage.setItem('token', response.data.data.token);
                    //setLoggedIn(true);
                    setTimeout(() => {
                        //navigate("/profile");
                        window.open("/profile", "_top");
                    }, 800);
                }
                else{
                    setLoginStatus("Wrong id or password");
                }
            })
            .catch(error => {
                //console.error(error);
                if (error.response && error.response.status === 401) {
                    setLoginStatus("Wrong id or password");
                    // Perform appropriate action, such as redirecting to login page
                } else {
                    // Handle other errors
                    console.log("Error:", error.message);
                }
            });
        }

        document.querySelector(".logfrm").reset();
    };
  
  return (
    <div className="loginpage" >
        <form className="logfrm">
            <h2>Login User</h2>
            <div className="loginCreds">
                <FaRegAddressBook className ="loginCredsIcons"/>
                <input type="text" id="name" name="name" placeholder="Insert Usernanme" value={username} onChange={(event) => {setUsername(event.target.value);}}/><br/>
            </div>
            
            <div className="loginCreds">
                <FaRegAddressBook className ="loginCredsIcons"/>
                <input type="password" id="pass" name="pass" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/><br/>
            </div>
            <p>{loginStatus}</p><br/>
            <Button className="logfrmbut" onClick={loginUser}>Login</Button><br/>
            <Link to="/forgetpass" className="frgtps">Forgot password?</Link><br/>
            {/*<h3  className="logfrmbut" onClick={loginUser}>Login</h3><br/>*/}
            <Link to="/signup" className="logToReg">Don't Have an account? SignUp </Link><br/>
        </form>   
    </div>
  )
}

export default Login