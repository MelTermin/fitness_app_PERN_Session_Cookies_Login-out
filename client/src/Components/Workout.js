import React,{useState,useEffect}  from 'react'




function Workout() {

  const [workoutSearch,setWorkoutSearch]=useState([]);
  const [searchWorkOut, setSearchWorkOut]= useState("")
  const selectedDetails= [
   
    {
      id:1,
      name:"Equipment",
      value:"equipment"
    },
    {
      id:2,
      name:"Target",
      value:"target"
    },
    {
      id:3,
      name:"Body Part",
      value:"bodyPart"
      
    },
  ]

  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e) => {
    console.log(e.target.value);
    setOptionValue(e.target.value);
  };
 
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggle= ()=> {
    setIsActive(!isActive);
  }
  const reset=()=> {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);



  const handleWorkOut= () => {

 setIsLoading(true)

  fetch(`https://exercisedb.p.rapidapi.com/exercises/${optionValue}/${searchWorkOut}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "exercisedb.p.rapidapi.com",
		"x-rapidapi-key": "69e6ee80c3msha0293102a2b1b69p10242djsnb05d1985bf4c"
	}
})
.then(response => {
  return response.json();
})
.then(data=>{
  console.log(data);

  setWorkoutSearch(data)
  
  setTimeout(() => {
    setIsLoading(false);
    }, [1000]);
  
})
.catch(err => {
  console.error(err);
});
setSearchWorkOut("")
}


  return (
    <div className="workout-container" id="workout">
       <div className="search-container">
        
        <div className="search-box">
        <select onChange={handleSelect} >
            {selectedDetails.map((item)=> {
              return(
                <option value= {item.value} key= {item.id}>{item.name }</option>
                
              )
            })}
        
          </select>
      
          <input className="workout-search" type="text" placeholder="Please search for exercise type" value= {searchWorkOut} onChange= {(e)=>setSearchWorkOut(e.target.value)}></input>
         
          <button className="button-search" onClick= {handleWorkOut}>Search</button>


        </div>

          <div className="countdown-container">
            <p className="seconds-title">{seconds}s</p>
            <button className={`countdown-btn ${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}</button>
            <button className="countdown-btn"  onClick={reset}>Reset</button>
            </div>
      </div>
      
      {isLoading &&
            <div className="loader1"> 
              <span></span>
              <span></span>
              <span></span>

            </div>
          }

         <div className="card-container">
        
        {
          workoutSearch.slice(0,30).map((item) => {
          return (
            
            <div className="workout-cards"  key= {item.id} >
               <p className="title-workout">Body Part:{item.bodyPart}</p>
              {/* <p className="title-workout">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p> */}
              <img className="gif" src= {item.gifUrl} alt="gif"></img>
            
  
              <div className="workout-details" > 
                <p>Equipment:{item.equipment} </p>
                <p>Target:{item.target}</p>
              </div>
            
            </div>
           
            
            )
                  })
        }
  
          </div>
    </div>
  )
}

export default Workout
