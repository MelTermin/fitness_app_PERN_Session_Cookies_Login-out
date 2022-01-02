import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import Welcome from "./Welcome"
import axios from "axios"
import Navbar from "./Navbar"
import Workout from './Workout.js';
import Progress from './Progress.js';
import Contact from "./Contact"





function Profile() {
 
  const {id}=useParams()
  console.log(id,"from profile")
  
  const [name, setName] = useState("");

  


  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/user/${id}/getuser`,{
          withCredentials: true,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",                
        }
        });
        console.log(response);
        setName(response.data[0].user_name)

        
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  },[])

  return (
    <>
      <Navbar name={name}/>
      <Welcome></Welcome>
      <Workout></Workout>
      <Progress></Progress>
      <Contact></Contact>
    
    </>
      

    
    
  )
}

export default Profile
