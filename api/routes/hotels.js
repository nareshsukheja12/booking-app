import express from "express"
import hotel from "../models/hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, deleteHotels, getHotel, getHotels, updateHotel } from "../controllers/hotelController.js";
import {verifyAdmin} from "../utils/verifyToken.js" 

const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel)
//update
router.put("/:id", verifyAdmin, updateHotel)
//delete
router.delete("/:id", verifyAdmin, deleteHotel)
//delete all
router.delete("/", verifyAdmin, deleteHotels)
//get
router.get("/find/:id", getHotel)
//get all
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

export default router