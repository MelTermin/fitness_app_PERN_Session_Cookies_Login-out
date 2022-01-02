
import React,{useState} from 'react'
import { Link,useHistory } from "react-router-dom";



function Register() {
  const history=useHistory();
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const[error,setError]=useState("");

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password,name };
      const response = await fetch(
        "http://localhost:7000/auth/register",
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
      // console.log(parseRes.message,"RESPONSE")
  
      if(parseRes.message) {
        setError(parseRes.message)
      }else{
        history.push(`/profile/${parseRes.id}`)
      }
     
      
     
     
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <div style={{backgroundColor:"#34495e", height:"100vh", display:"flex"}}>
    <div className="register-wrapper">
      <h1 style={{textAlign:"center",marginTop:"20px"}}>Register</h1>
      <form  onSubmit={onSubmitForm}>
      <small>{error}</small>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Please type your email"
          onChange={e => onChange(e)}
          required
          
        />
        <label>Name:</label>
         <input
          type="text"
          name="name"
          value={name}
          placeholder="Please type your name"
          onChange={e => onChange(e)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Please type your password"
          onChange={e => onChange(e)}
          required
        />
       <br/>
       <br/>
        <button className="btn-register">Submit</button>
        <div className="register-container" style={{marginTop:"20px"}}>
          <p>Already registered ?</p>
          <Link style={{textDecoration:"none", color:"black"}} to="/">Login</Link>
      </div>
      </form>
      
    </div>
    </div>
  )
}

export default Register


