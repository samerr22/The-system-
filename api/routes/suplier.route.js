import  express  from "express";
import { createorder, createsuplier, deletesuplier, getAllsuplier, updatesuplier } from "../controllers/suplier.controller.js";

const router = express.Router();

router.post('/Pcreate',createsuplier );
router.get('/getAll', getAllsuplier);
router.put('/sup/:suplierId',updatesuplier);
router.delete('/deletesup/:supId',deletesuplier);
router.post('/Ocreate',createorder );


export default router;