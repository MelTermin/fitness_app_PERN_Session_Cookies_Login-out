
import React,{useState} from 'react'
import Message from './Message';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebook,FaYoutube } from 'react-icons/fa';
import {SiInstagram} from 'react-icons/si';
import emailjs from 'emailjs-com';

function Contact() {
  const [firstname, setFirstName]=useState("");
  const [lastname, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const [message,setMessage]=useState("")
  const [isSent ,setIsSent]=useState(false)

  const handleSubmit= (e)=> {
    e.preventDefault();
    emailjs.sendForm('service_ji1fajk', 'template_qw4gkjw', e.target, "user_JdMRQWpjtB3CuM8dRJkjN")
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });


    setFirstName("")
    setLastName("")
    setEmail("")
    setMessage("")
    setIsSent(true)
    
  }
  
  setTimeout(()=>{
    setIsSent(false)
  },6000)

  return (
    <div id="contact" className="contact-container">
      <form onSubmit= {handleSubmit}>
        <div className="headline">
         <HiOutlineMail size={32} color={"crimson"}/>SEND US A REQUEST
        </div>
      

      <label>First Name:</label>
        <input className="field" type="text" value= {firstname}  name="firstname"onChange={e => setFirstName(e.target.value)} ></input>

        <label>Last Name:</label>
        <input className="field" type="text" value= {lastname} name="lastname" onChange={e => setLastName(e.target.value)}></input>

        <label>Email:</label>
        <input className="field" type="text" value= {email} name="email" onChange={e => setEmail(e.target.value)}></input>

        <label>Message:</label>
        <textarea   type="text" value= {message} name="message" onChange={e => setMessage(e.target.value)}></textarea>
        
        <br></br>
        <div >{isSent ? <Message />:null}</div>
        <br></br>
        <button className="contact-btn" type="submit"  >Send</button>
        <br></br>
        <br></br>
        <div className="social-media-contact">
              <FaFacebook size={32}></FaFacebook>
              <SiInstagram size={32}></SiInstagram>
              <FaYoutube size={32}></FaYoutube>
        </div>
      
      </form>
    </div>
  )
}

export default Contact
