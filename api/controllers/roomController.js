import hotel from "../models/hotel.js";
import room from "../models/room.js";
import {createError} from "../utils/error.js";

//create
export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid
    const newRoom = new room(req.body)
    
    try {
        const savedRoom = await newRoom.save()
        try {
            await hotel.findByIdAndUpdate(hotelId,
                {$push : {rooms: savedRoom._id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
    
}
//update
export const updateRoom = async(req,res,next)=>{
    try {
        const updatedRoom = await room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
}
//delete
export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    try {
        await room.findByIdAndDelete(req.params.id)
        try {
            await hotel.findByIdAndUpdate(hotelId,
                {$pull : {rooms: req.params.id}})
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted")
    } catch (err) {
        next(err)
    }
}
//delete all
export const deleteRooms = async(req,res,next)=>{
    try {
        await room.deleteMany()
        res.status(200).json("Rooms have been deleted")
    } catch (err) {
        next(err)
    }
}
//get
export const getRoom = async(req,res,next)=>{
    try {
        const Room = await room.findById(req.params.id)
        res.status(200).json(Room)
    } catch (err) {
        next(err)
    }
}
//get all
export const getRooms = async(req,res,next)=>{
    try {
        const Rooms = await hotel.find()
        res.status(200).json(Rooms)
    } catch (err) {
        next(err)
    }
}