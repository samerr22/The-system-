
import Contract from "../models/contract.model.js";



//create contract
export const createsContract = async (req, res, next) => {
  

  const {  name,contactp,startdate,enddate, Terms , payment,delivery, Renewal } = req.body;

  const newSuplier = new Contract({
   
    name,
    contactp,
    startdate,
    enddate,
    Terms,
    payment,
    delivery,
    Renewal





   
   
    

  });
  try {
    const savedsup = await newSuplier.save();
    res.status(201).json(savedsup);
  } catch (error) {
    next(error);
  }
};




//get all Contract
export const getAllContract = async (req, res, next) => {
  try {
    const contract = await Contract.find();

    if (contract.length > 0) {
      res.json({ message: "contract detail retrieved successfully", contract});
    } 
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



//delete suplier
export const deleteContract = async (req, res, next) => {

  try {
    await Contract.findByIdAndDelete(req.params.CId);
    res.status(200).json("The contract has been deleted");
  } catch (error) {
    next(error);
  }
};



//update suplier
export const updatesContract = async (req, res, next) => {
 
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.contratId,
      {
        $set: {
         
        
          name: req.body.name,
          contactp: req.body.contactp,
          startdate: req.body.startdate,
          enddate: req.body.enddate,
          Terms: req.body.Terms,
          payment: req.body.payment,
          delivery: req.body.delivery,
          Renewal: req.body.Renewal,
          
        },
      },
      { new: true }
    );
    res.status(200).json(contract);
  } catch (error) {
    next(error);
  }
};




 