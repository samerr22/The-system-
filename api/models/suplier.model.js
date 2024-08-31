import mongoose from 'mongoose';

const suplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    contact: {
      type: Number,
      required: true,
      
    },
    Address: {
      type: String,
      required: true,
    },
    SItems: {
      type: String,
      required: true,
     
    },
   
  },
  { timestamps: true }
);

const Suplier = mongoose.model('Suplier', suplierSchema);

export default Suplier;