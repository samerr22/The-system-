import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    contactp: {
      type: String,
      required: true,
      
    },
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      required: true,
     
    },
    Terms: {
      type: String,
      required: true,
     
    },
    payment: {
      type: String,
      required: true,
     
    },
    delivery: {
      type: String,
      required: true,
     
    },
    Renewal: {
      type: String,
      required: true,
     
    },
   
  },
  { timestamps: true }
);

const Contract = mongoose.model('contract', contractSchema);

export default Contract;