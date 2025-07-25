import User from "../models/user.model.js"
import {customResponse} from "../utils/customResponse.js"
import {EMAIL_PATTERN, PASSWORD_PATTERN} from "../utils/Pattern.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"



const register = async (req, res)=>{
    try{
        const {name, email, password, role}= req.body
        if(!name.trim() || !email.trim()|| !password.trim() || !role.trim()){
            return customResponse(res, 400, "All field are required", "missig field", false, null)
        }
        if(!EMAIL_PATTERN.test(email)){
            return customResponse(res, 400, "please enter a valid email","Invalid Email", false, null)
        }
        if(!PASSWORD_PATTERN.test(password)){
            return customResponse(res, 400, "Password must be alphanumeric", "Invalid", false, null)
        }
        const existingUser =await User.findOne({email})
        if(existingUser){
            return customResponse(res, 400, "use another email", "user already exist", false, null)
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({name, email, password : hashedPassword, role})
        const token = generateToken(user._id, user.role)

        return customResponse(res, 201, "User created successfully", "null", true, {
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            token : token
        })


    }
    catch(error){
        return customResponse(res, 500, "server error", `error : ${error}`, false, null)
    }
}

const login = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email.trim() || !password.trim()){
            return customResponse(res, 400, "All field is required", "missing input", false, null)
        }
        const user = await User.findOne({email})
        if(!user){
            return customResponse(res, 400, "User not exist", "enter a valid email", false, null)
        }

        const ispasswordMatch = await bcrypt.compare(password, user.password)
        if(!ispasswordMatch){
            return customResponse(res, 400, "enter correct password","invalid credentials", false, null )
        }

        const token = generateToken(user._id, user.role)

        return customResponse(res, 201, "User login successfully", null, true, {
            id : user._id,
            name : user.name,
            email : email,
            role : user.role,
            token : token
        })
    }
    catch(error){
        return customResponse(res, 500, "server error", `error : ${error}`, false, null)

    }
}
export {register, login}