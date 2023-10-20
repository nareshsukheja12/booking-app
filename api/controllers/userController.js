import User from "../models/user.js"

//update
export const updateUser = async(req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}
//delete
export const deleteUser = async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err)
    }
}
//delete all
export const deleteUsers = async(req,res,next)=>{
    try {
        await User.deleteMany()
        res.status(200).json("Users have been deleted")
    } catch (err) {
        next(err)
    }
}
//get
export const getUser = async(req,res,next)=>{
    try {
        const User = await User.findById(req.params.id)
        res.status(200).json(User)
    } catch (err) {
        next(err)
    }
}
//get all
export const getUsers = async(req,res,next)=>{
    try {
        const Users = await User.find()
        res.status(200).json(Users)
    } catch (err) {
        next(err)
    }
}