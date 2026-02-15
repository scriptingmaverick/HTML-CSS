import validator from "validator"
import bycrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt  from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

// ------------------- API For Adding Doctor -----------------

const addDoctor = async (req,res) =>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile = req.file

        // ------------ vaalidating email --------------

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // -------------- validating password --------------

        if(password.length < 8){
            return res.json({success:false,message:"Try some strong password"})
        }

        // ---------------- hashing doctor password --------------

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)

        // -------------------- upload image to cloudinary --------------------
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUri = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUri,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Added"})
    
    } catch (error) {
        res.json({success:false,message:"error came :"+error})
    }
}

// -------------- API For The Admin Login ----------------

const loginAdmin = async (req,res) => {

    try {
        const {email,password} = req.body

        if(email  === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token  = jwt.sign(email+password,process.env.JWT_SECRET)

            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (err) {
        res.json({success:false,message:err.message})
    }
}

// --------------- api to get doctor list for admin-panel --------------------

const allDoctors = async (req,res) => {
    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


// ----------------- api to get appointment list ---------------------

const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})

        res.json({success:true,appointments})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// ------------------ apointment cancellation by admin ------------------


const appointmentCancel = async(req,res) => {
    try {
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

     
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        
        // --------- releasing doctor slot ---------
        
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)
        
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment Cancelled"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// -------------- api to get dashboard data -----------------

const adminDashboard= async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const appointments = await appointmentModel.find({})
        const users = await userModel.find({})

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export {addDoctor,loginAdmin,allDoctors, appointmentsAdmin,appointmentCancel,adminDashboard}
