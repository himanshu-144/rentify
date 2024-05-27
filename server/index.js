const express = require("express");
const app = express();
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const colors = require("colors");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
const path = require("path");

const userRoutes = require("./routes/userRouter");
const authRoutes = require("./routes/authRouter");
const listingRoutes = require("./routes/listingRouter");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/properties", listingRoutes)

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
});



const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`.yellow.bold);
})