import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connnectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// App config
const app = express()
const port =process.env.port || 4000
connectDb()
connnectCloudinary()


// Middlewares
app.use(express.json())
app.use(cors())

// Api end-points

app.use('/api/admin',adminRouter)

app.use('/api/doctor',doctorRouter)

app.use('/api/user',userRouter)

app.get('/',(req,res) => {
    res.send('API WORKING')
})


app.listen(port, () => console.log('Server Started',port))