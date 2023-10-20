import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, updateRoom, deleteRoom, deleteRooms, getRoom, getRooms} from "../controllers/roomController.js";
createRoom
const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom)
//update
router.put("/:id", verifyAdmin, updateRoom)
//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)
//delete all
router.delete("/", verifyAdmin, deleteRooms)
//get
router.get("/:id", getRoom)
//get all
router.get("/", getRooms)

export default router