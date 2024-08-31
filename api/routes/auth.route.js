import express from "express";
import {  signgin,   signup,  singOut, updateUser } from "../controllers/auth.controller.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.put( '/update/:userId', updateUser);
route.post("/signout", singOut)



export default route;
