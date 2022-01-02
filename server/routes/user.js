const router = require("express").Router();
const pool = require("../db");

router.get("/:id/getuser", async (req, res) => {
const {id}=req.params
  try {
    
    const user = await pool.query(
      "SELECT u.user_name, t.tracker_form_id, t.exercise, t.repetition, t.weight,t.duration, t.date from users AS u LEFT JOIN tracker_form AS t ON u.id = t.user_id WHERE u.id = $1",
      [id]);
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

})

//create a trackeritem

router.post("/:id/tracker", async (req, res) => {
  const {id}=req.params
  try {
    const {exercise,repetition,weight,duration,date}= req.body
    console.log(req.body)
    const newTrackerItem = await pool.query(
      "INSERT INTO tracker_form (user_id,exercise,repetition,weight,duration,date) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *",
      [id,exercise,repetition,weight,duration,date]
    );

    res.json(newTrackerItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.put("/:id/tracker", async (req, res) => {
  try {
    const { id } = req.params;
    const {exercise,repetition,weight,duration,date}= req.body
    console.log(req.body)
    const newTrackerItem = await pool.query(
      "UPDATE tracker_form SET exercise= $1, repetition=$2, weight=$3 ,duration=$4, date=$5 WHERE tracker_form_id=$6 returning *",[ exercise,repetition,weight,duration,date,id]
    );

    if (newTrackerItem.rows.length === 0) {
      return res.json("This tracker is not yours");
    }

    res.json(newTrackerItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a item 

router.delete("/:id/tracker", async(req,res) => {
  try {
    const { id } = req.params;
    const deleteTrackerItem= await pool.query("DELETE from tracker_form where tracker_form_id=$1 RETURNING *", [id])
    
    if (deleteTrackerItem.rows.length === 0) {
      return res.json("This trackerItem is not yours");
    }

    res.json("TrackerItem was deleted");
  
  }catch (err) {
    console.log(err.message)
  }
})
//get a one item//
router.get("/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const getItem= await pool.query("select * from tracker_form where tracker_form_id=$1", [id])
    

    res.json(getItem.rows[0]);
  
  }catch (err) {
    console.log(err.message)
  }
})



module.exports = router;