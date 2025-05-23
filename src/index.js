import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './routes/index.js'
import DBConnection from '../dbConfig.js'

const HOST_NAME = "0.0.0.0"
const app = express()

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin:"https://attendanceportalui.netlify.app",
  credentials: true
};

app.use(express.json())
app.use(cors(corsOptions))

app.use('/',AppRoutes)


app.listen(PORT,HOST_NAME,()=>console.log(`App listening ${PORT}`))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
  });

DBConnection()