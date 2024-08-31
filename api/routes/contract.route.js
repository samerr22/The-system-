import  express  from "express";
import {  createsContract,  deleteContract,  getAllContract,  updatesContract,  } from "../controllers/contract.controller.js";

const router = express.Router();

router.post('/Pcreate',createsContract );
router.get('/getAll', getAllContract);
router.put('/sup/:contratId',updatesContract);
router.delete('/deletesup/:CId',deleteContract);



export default router;