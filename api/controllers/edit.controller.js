

import Edit from "../models/edit.model.js";



//create contract
export const EcreatesContract = async (req, res, next) => {
  

  const {  name,contactp,startdate,enddate, Terms , payment,delivery, Renewal } = req.body;

  const newSuplier = new Edit({
   
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
export const EgetAllContract = async (req, res, next) => {
  try {
    const contract = await Edit.find();

    if (contract.length > 0) {
      res.json({ message: "contract detail retrieved successfully", contract});
    } 
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



//delete 
export const EdeleteContract = async (req, res, next) => {

  try {
    await Edit.findByIdAndDelete(req.params.EId);
    res.status(200).json("The contract has been deleted");
  } catch (error) {
    next(error);
  }
};



//update 
export const EupdatesContract = async (req, res, next) => {
 
  try {
    const contract = await Edit.findByIdAndUpdate(
      req.params.EcontratId,
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




 