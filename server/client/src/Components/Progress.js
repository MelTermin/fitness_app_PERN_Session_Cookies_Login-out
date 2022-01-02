import React,{useState,useEffect} from 'react'
import {useParams,} from "react-router-dom"

import ProgressList from './ProgressList'
import axios from "axios";


function Progress() {
  const {id}=useParams()

  const [exercise, setExercise]= useState("")
  const [repetition,setRepition]=useState("")
  const [weight,setWeight]=useState("")
  const [duration,setDuration]=useState("")
  const [date,setDate]=useState("")
  const [item,setItem]=useState([]);
  


  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const body = { exercise,repetition,weight,duration,date };
      const response = await fetch(
        `https://fitnessappmel.herokuapp.com/user/${id}/tracker`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();
      console.log(parseRes,"from progress")
      setItem([...item, parseRes])
      setWeight("")
      setDuration("")
      setExercise("")
      setRepition("")
      setDate("")
 
        
    } catch (err) {
      console.log(err);

      
    }
  }

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fitnessappmel.herokuapp.com/user/${id}/getuser`,{
          withCredentials: true,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",                
        }
        });
        console.log(response);
        setItem(response.data)
     

        
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  },[setItem])
  return (
    <div id="progress" className="progress-container">
        <form className="workout-details-form" onSubmit= {handleSubmit}   >
        
        <h1 className="form-title">Workout Detail Form</h1>
          
          
          <input required type="text" value= {exercise}  name="exercise" onChange={e => setExercise(e.target.value)} placeholder="Please type a exercise " ></input>
          

         
          <input required type="number" value= {repetition} name="repetition" onChange={e => setRepition(e.target.value)} placeholder="Repetition " ></input>
  
          
          <input required type="number" value= {weight} name="weight" onChange={e => setWeight(e.target.value)}  placeholder="Weight" ></input>
  
         
          <input required type="number" value= {duration} name="duration" onChange={e => setDuration(e.target.value)} placeholder="Duration" ></input>
  
         
          <input required type="date" value={date} name="date"  onChange={e => setDate(e.target.value)}></input>
          
          <br/>
          <button className="btn-add" type="submit">ADD</button> 
        </form>
        <ProgressList item={item} setItem={setItem}/>
    </div>
  )
}

export default Progress
