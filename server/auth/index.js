const express=require("express");
const router=express.Router();
const pool= require("../db")
const bcrypt=require("bcrypt");



router.get('/',(req,res)=> {
  res.json({
    message:"lalal"
  });
})



router.post("/register", async (req,res,next)=> {
    try{
      
    const {email,password,name}=req.body;
    const user= await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);
    //res.json(user.rows)
    
    if(user.rows.length !==0) {
      // if the user exists//
      next(new Error("Email in use"))
     
    } 
    
    //if user if registering for the first time
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const bcryptPassword= await bcrypt.hash(password,salt);
  
    const newUser= await pool.query("INSERT INTO users(user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[name, email,bcryptPassword])

     res.json(newUser.rows[0])//this gives me the new added user

  }catch(err){
    next (new Error("Invalid user"));
  }


})


router.post("/login", async(req,res,next) =>{
  try{
    const{email,password}=req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email]);
    
      
      
      if (user.rows.length === 0)  {
        next(new Error("Wrong Email entry"))
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        next(new Error("Wrong Password"));
      } else {
        const isSecure=req.app.get('env') != 'development'
        res.cookie("id",user.rows[0].id,{
          httpOnly: true,
          signed:true,
          secure:isSecure
        })

         res.json({
          id:user.rows[0].id,
          messages:"logged in"
        });


      }

  }catch(err){
    next(new Error("Invalid login"))
  }
})

module.exports=router;

