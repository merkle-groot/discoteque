const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const intro = require("./routes/api/introRoute");
const artists = require("./routes/api/artistRoute");
var cors = require('cors');


const app = express();

//use cors
app.use(cors());

// bodyParser Middleware
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongo
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser: true
})
.then(()=>console.log("Mongo Congo Connected..."))
.catch(err => console.log(err));

// use routes
app.use("/api/intro",intro);
app.use("/api/artists",artists);

// result
// app.get("/result", (req,res)=>{
//     console.log(res.json());
// })

// running on port
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening on Port: ${port}`))
