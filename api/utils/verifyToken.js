import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401, "you are not authenticated"))
    }
    jwt.verify(token, process.env.JWT, (err, loginUser) => {
        if (err) return next(createError(403, "token is invalid"))
        req.loginUser = loginUser
        next()
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.loginUser.id === req.params.id || req.loginUser.isAdmin){
            next()
        }else{
            return next(createError(403, "you are not authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.loginUser.isAdmin){
            next()
        }else{
            return next(createError(403, "you are not authorized"))
        }
    })
}