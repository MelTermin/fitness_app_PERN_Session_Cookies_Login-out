import React,{useEffect,useRef} from 'react'
import { init } from 'ityped'

function Welcome() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed:60,
      strings: ["Welcome to your fitness app"]
    });
  }, []);
  return (
    <div className="welcome-container">
      <div className="animation-text">
        <h2 className="text-ref"><span ref= {textRef}></span></h2>
      </div>
      
      <div className="btn-div">
        <a className="start-link" href="#workout"> Click here to chose your workout</a> 
      </div>
      
    </div>
  )
}

export default Welcome
