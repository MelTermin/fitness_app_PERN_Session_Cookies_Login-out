const express=require("express");
const cors=require("cors");
const env=require('dotenv')
const cookieParser = require("cookie-parser");
const auth=require("./auth");
const user=require("./routes/user");
const authMiddleware=require("./auth/middleware")
const path=require("path")
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



// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message:err.message,
    // error:req.app.get('env') === 'development' ? err : {}

  })
 
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})
