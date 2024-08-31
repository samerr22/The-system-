import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    Iname: {
      type: String,
      required: true,
      
    },
    quntity: {
      type: Number,
      required: true,
      
    },
    description: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;