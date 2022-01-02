const express=require("express");
const cors=require("cors");
const env=require('dotenv')
const cookieParser = require("cookie-parser");
const auth=require("./auth");
const user=require("./routes/user");
const authMiddleware=require("./auth/middleware")

env.config();


const app=express();
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use("/auth",auth);
app.use("/user",authMiddleware.ensureLoggedIn,user);




// app.get("/profile", validateToken, async (req, res) => {
 
//   try {
    
//     const user = await pool.query(
//       "SELECT u.user_name, t.tracker_form_id, t.exercise, t.repetition, t.weight,t.duration, t.date from users AS u LEFT JOIN tracker_form AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
//       [req.user]);
      
    
//     res.json(user.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }

// });

// //create a trackeritem

// app.post("/tracker", validateToken, async (req, res) => {
//   try {
//     const {exercise,repetition,weight,duration,date}= req.body
//     console.log(req.body)
//     const newTrackerItem = await pool.query(
//       "INSERT INTO tracker_form (user_id,exercise,repetition,weight,duration,date) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *",
//       [req.user,exercise,repetition,weight,duration,date]
//     );

//     res.json(newTrackerItem.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });



// //update a trackeritem

// app.put("/tracker/:id", validateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {exercise,repetition,weight,duration,date}= req.body
//     console.log(req.body)
//     const newTrackerItem = await pool.query(
//       "UPDATE tracker_form SET exercise= $1, repetition=$2, weight=$3 ,duration=$4, date=$5 WHERE tracker_form_id=$6 AND user_id = $7 returning *",[ exercise,repetition,weight,duration,date,id,req.user]
//     );

//     if (newTrackerItem.rows.length === 0) {
//       return res.json("This tracker is not yours");
//     }

//     res.json(newTrackerItem.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });


// //delete a trackerItem

// app.delete("/tracker/:id", validateToken, async(req,res) => {
//   try {
//     const { id } = req.params;
//     const deleteTrackerItem= await pool.query("DELETE from tracker_form where tracker_form_id=$1  AND user_id = $2 RETURNING *", [id,req.user])
    
//     if (deleteTrackerItem.rows.length === 0) {
//       return res.json("This trackerItem is not yours");
//     }

//     res.json("TrackerItem was deleted");
  
//   }catch (err) {
//     console.log(err.message)
//   }
// })


// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message:err.message,
    error:req.app.get('env') === 'development' ? err : {}

  })
 
});



app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})
