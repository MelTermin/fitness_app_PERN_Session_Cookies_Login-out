import React,{useState,useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios"

function Update() {
  const { id } = useParams();
  let history = useHistory();

  const [exercise, setExercise]= useState("")
  const [repetition,setRepition]=useState("")
  const [weight,setWeight]=useState("")
  const [duration,setDuration]=useState("")
  const [date,setDate]=useState("")
  const [idProfile,setIDProfile]=useState("")



  useEffect(()=> {
    getItem();

  },[])

  const getItem= async () => {
    const response= await axios.get(`http://localhost:7000/user/${id}`,{
      withCredentials: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",                
    }
    })
    console.log(response)
    setExercise(response.data.exercise);
    setRepition(response.data.repetition);
    setWeight(response.data.weight);
    setDuration(response.data.duration);
    setIDProfile(response.data.user_id)
    
  
  }

 
  const handleEdit= async (e) =>{
    e.preventDefault();
    try {
      const body = { exercise, repetition,weight,date,duration };
      const response = await fetch(
        `http://localhost:7000/user/${id}/tracker`,
        {
          method:"PUT",
          headers: {
            "Content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      console.log(parseRes,"from update")
      history.push(`/profile/${idProfile}#progress`)

    }catch(err) {
      console.log(err)
    }

  }

  return (
    <div className="edit-container">
      <form className="workout-edit-form" onSubmit= {handleEdit}   >
        
        <h1 className="form-title">Workout Detail Edit Form</h1>
          
          
          <input required type="text" value= {exercise}  name="exercise" onChange={e => setExercise(e.target.value)} placeholder="Please type a exercise " ></input>
  
          
          <input required type="number" value= {repetition} name="repetition" onChange={e => setRepition(e.target.value)} placeholder="Repetition " ></input>
  
         
          <input required type="number" value= {weight} name="weight" onChange={e => setWeight(e.target.value)}  placeholder="Weight" ></input>
  
          
          <input required type="number" value= {duration} name="duration" onChange={e => setDuration(e.target.value)} placeholder="Duration" ></input>
  
         
          <input required type="date" value={date} name="date"  onChange={e => setDate(e.target.value)}></input>
          
          <br/>
          <button className="btn-update" type="submit">EDIT</button> 
        </form>
    </div>
  )
}

export default Update
