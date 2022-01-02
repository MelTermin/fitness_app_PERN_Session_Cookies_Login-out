import React,{useState} from 'react'
import { Link,useHistory } from "react-router-dom";
import { FaTimes,FaBars } from 'react-icons/fa';

function Navbar({name}) {
  const [click, setClick] = useState(false);
  
  const handleClick = () => setClick(!click)
  
  const history=useHistory();
  const logout = async (e) => {
    history.push("/");

  };
  return (
    <div>
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
        Welcome, {name}</div>

        <ul  className={click ? "nav-menu active" : "nav-menu"}>

          <li className="nav-item">
            <a href="#workout">Workout</a></li>

            <li className="nav-item">
            <a href="#progress">Progress</a></li>
          
            <li className="nav-item">
            <a href="#contact">Contact</a></li>
          
          <li className="nav-item" >
            <Link
             onClick={e => logout(e)} className="logout-btn"
              activeClassName="active"
              className="nav-links"
             
            >
              Logout 
            </Link>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? <FaTimes /> :<FaBars />}
        </div>
       
      </div>
      
    </nav>
   
 
  </div>
  
  )
}

export default Navbar
