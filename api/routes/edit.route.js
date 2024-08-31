import  express  from "express";
import { EcreatesContract, EdeleteContract, EgetAllContract, EupdatesContract } from "../controllers/edit.controller.js";


const router = express.Router();

router.post('/EPcreate',EcreatesContract );
router.get('/EgetAll', EgetAllContract);
router.put('/Esup/:EcontratId',EupdatesContract);
router.delete('/Edeletesup/:EId',EdeleteContract);



export default router;