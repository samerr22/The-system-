import express from "express";
import { Ssigngin, Ssignup, SsingOut } from "../controllers/supplier.controller.js";





const route = express.Router();

route.post("/signup", Ssignup);
route.post("/signin", Ssigngin);
route.post("/signout", SsingOut);



export default route;


