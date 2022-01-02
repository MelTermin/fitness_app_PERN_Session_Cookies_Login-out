import axios from 'axios';
import React from 'react'
import {Link} from "react-router-dom";



function ProgressList({item,setItem}) {

const onDeleteUser= async (id) => {
        console.log("tracker_item_id", id)
        try {
          const response = await axios.delete(`http://localhost:7000/user/${id}/tracker`,{
            withCredentials: true,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",                
          }
          });

        setItem(item.filter(detail => detail.tracker_form_id !== id));
        } catch (err) {
        console.error(err.message);
        }
}

  return (
    <div>
               <table className="styled-table">
        <thead>
          <tr>
          
            <th style= {{textAlign:"center"}}>Exercise</th>
            <th style= {{textAlign:"center"}}>Duration</th>
            <th style= {{textAlign:"center"}}>Date</th>
            <th style= {{textAlign:"center"}}>Weight</th>
            <th style= {{textAlign:"center"}}>Repetition</th>
            <th style= {{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {item.length !== 0 &&
            item[0].tracker_form_id !== null &&
          item.map((details)=>{
            return(
              <tr key={item.tracker_form_id+1000}>
                <td>{details.exercise}</td>
                <td>{details.duration}</td>
                <td>{new Date (details.date).toLocaleDateString("en-US")}</td>
                <td>{details.weight} </td>
                <td>{details.repetition}</td>
                <td>
                  <Link to= {`/update/${details.tracker_form_id}`}>
                    <button className="btn btn-edit">
                      Edit
                    </button>
                  </Link>
                  <button className="btn btn-delete" onClick= {()=>onDeleteUser(details.tracker_form_id)} >Delete</button>
                  
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ProgressList
