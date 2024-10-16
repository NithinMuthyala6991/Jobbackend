
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import 'dotenv/config'
import userRoute from './routes/routes.js';

const app = express();
app.use(cors("*"))

app.use(express.json());
app.use(express.static('public'))



mongoose.connect(process.env.MONGO_DB_URL).then((res) => {
        console.log("Db Connected !")
        app.listen(8080,() => console.log(`Server is Running at ${process.env.PORT}`))
})
.catch((err) => {
    console.log("Db Error ", err.message)
})

app.use("/api/v1",userRoute)