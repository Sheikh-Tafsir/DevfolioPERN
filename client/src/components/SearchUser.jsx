import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Loading from '../components/Loading';
import "../styles/SearchUser.css"

const SearchUser = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fetchResults, setFetchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getAlluser = async () =>{
        
        const apipath = `${process.env.REACT_APP_API_URI}/user/alluser`;
        //const apipath = `http://localhost:3001/user/allusers`;
        try{
            const response = await Axios.get(apipath);
            //console.log(response.data.data);
            setLoading(false);
            setFetchResults(response.data.data);
        }
        catch (error) {
            // Handle errors here
            setLoading(false);
            console.error('Error fetching user data:', error.message);
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        filterResults(e.target.value);
    };

    const filterResults = (value) => {
        //console.log("value " + value);
        if(value == null || value === ""){
            setSearchResults([]);
        }
        else if (Array.isArray(fetchResults)) {
          const filteredResults = fetchResults.filter((item) =>
            item.name && item.name.toLowerCase().includes(value.toLowerCase())
          );
          //console.log(filteredResults)
          setSearchResults(filteredResults);
        } 
        else {
          console.error("fetchResults is not an array or is undefined.");
          setSearchResults([]);
        }
      };

    const goToUserPortfolio = (name) => {     
        window.open(`/portfolio/${name}`, "_top");
        //navigate(`/portfolio/${name}`);
    }
    useEffect(() => {
        getAlluser();
    }, []);

    if (loading) {
        return(
          <Loading/>
        );
      }

  return (
    <>
        <div className="flex flex-col justify-center items-center text-white search-user">
            <div className="w-5/6 lg:w-1/3 search-bar-box">
                <form className="flex flex-row lg:w-5/6  lg:h-10 2xl:h-12 mx-auto mt-10 mb-8 search-user-form">
                    <input type="text" className="w-5/6 pl-5" placeholder="example name" value={searchValue} onChange={handleChange}/>
                    <FaSearch className="w-1/6 h-5 lg:h-4 2xl:h-6 mt-2.5 text search-icon"/>
                </form>
                <div>
                    <p className="flex justify-center mb-4 lg:text-lg 2xl:text-2xl">User Profiles</p>
                    {searchResults.map((curElem)=>{
                        return(
                            <div className="flex w-5/6 lg:text-sm 2xl:text-lg mx-auto mt-2 pt-2 userCard" key={curElem.id}>
                                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQmcqzN9KSMx-hxPJfiB3yt59uQhN9R4IqjisfUEitJv9lbQVN14QYLsUfmgiH-AoH2VgTFMdRBaTWa9XXpU9aMV1fveYnRgRsf4peaqt_rCR_qyQ483NgjHHdhfYpOr8axyGWhk3DHw5lAUQkXl6NGMugPS7k6Apw7CUjqRMgwAv01i2_AXyRumuBfw/w680/blank-profile-picture-hd-images-photo.JPG" alt="" className="rounded-full lg:h-7 lg:w-7 2xl:h-10 2xl:w-10 ml-4" />
                                <p className="w-1/2 lg:ml-3 2xl:ml-5 lg:mr-2 2xl:mr-5 lg:pt-0.5 2xl:pt-1">{curElem.name}</p>
                                <Button className="bg-orange-600 w-40 h-8 lg:w-14 lg:h-6 2xl:w-20 2xl:h-9 lg:text-sm 2xl:text-lg font-semibold pb-0.5 lg:mt-0.5 rounded-sm" onClick={()=>goToUserPortfolio(curElem.name)}>View</Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default SearchUser