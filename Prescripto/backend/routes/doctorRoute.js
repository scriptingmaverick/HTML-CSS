import express from'express'
import { cancelAppointment, doctorAppointments, doctorList, loginDoctor, completeAppointment, doctorDashboard, doctorProfile, updateProfile } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.post('/login',loginDoctor)

doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)

doctorRouter.post('/complete-appointment',authDoctor,completeAppointment)

doctorRouter.post('/update-profile',authDoctor,updateProfile)



doctorRouter.get('/list',doctorList)

doctorRouter.get('/appointments',authDoctor,doctorAppointments)

doctorRouter.get('/dashboard',authDoctor,doctorDashboard)

doctorRouter.get('/profile',authDoctor,doctorProfile)


export default doctorRouter