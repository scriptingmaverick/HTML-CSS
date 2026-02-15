import express from'express'
import { bookAppointment, cancelAppointment, getProfile, listOfAppointments, loginUser, paymentRazorpay, registerUser, updateProfile, verifyPayment } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

userRouter.post('/book-appointment',authUser,bookAppointment)

userRouter.post('/cancel-appointment',authUser,cancelAppointment)

userRouter.post('/payment-razorpay',authUser,paymentRazorpay)

userRouter.post('/verify-razorpay',authUser,verifyPayment)

userRouter.get('/get-profile',authUser,getProfile)

userRouter.get('/appointments',authUser,listOfAppointments)



export default userRouter