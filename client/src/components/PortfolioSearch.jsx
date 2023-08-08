import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
//import "../../styles/HeromainHome.css"
import "../styles/HeromainHome.css";

const PortfolioSearch = () => {
    const [userSearch, setUserSearch] = useState("");
  return (
    <div className="heromainHome" id="home">
        <input type="text" onChange={(event) => {setUserSearch(event.target.value);}}/>
    </div>
  )
}

export default PortfolioSearch