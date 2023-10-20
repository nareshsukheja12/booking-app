import { query } from "express"
import hotel from "../models/hotel.js"
import { createError } from "../utils/error.js"

//create
export const createHotel = async(req,res,next)=>{
    const newHotel = new hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}
//update
export const updateHotel = async(req,res,next)=>{
    try {
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}
//delete
export const deleteHotel = async(req,res,next)=>{
    try {
        await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}
//delete all
export const deleteHotels = async(req,res,next)=>{
    try {
        await hotel.deleteMany()
        res.status(200).json("Hotels have been deleted")
    } catch (err) {
        next(err)
    }
}
//get
export const getHotel = async(req,res,next)=>{
    try {
        const Hotel = await hotel.findById(req.params.id)
        res.status(200).json(Hotel)
    } catch (err) {
        next(err)
    }
}
//get all
export const getHotels = async(req,res,next)=>{
    const {min, max, ...others } = req.query
    try {
        const Hotels = await hotel.find({...others, cheapestPrice:{$gt:min || 0, $lt:max || 9999}}).limit(req.query.limit);
        //const query = hotel.find(req.query).limit(req.query.limit || 2);
        //console.log(query);
        //const Hotels = await query;
        //console.log(Hotels);
        res.status(200).json(Hotels)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType = async(req,res,next)=>{
    try{
    const hotelCount = await hotel.countDocuments({type:"hotel"})
    const apartmentCount = await hotel.countDocuments({type:"apartment"})
    const resortCount = await hotel.countDocuments({type:"resort"})
    const villaCount = await hotel.countDocuments({type:"villa"})
    const cabinCount = await hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotels",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ])
    } catch (err) {
        next(err)
    }
}