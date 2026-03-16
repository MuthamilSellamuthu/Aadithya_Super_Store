
import mongoose from 'mongoose';
import Order from './models/Order.js';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const checkOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const orders = await Order.find({});
    console.log(`Total orders in DB: ${orders.length}`);

    if (orders.length > 0) {
      const firstOrder = orders[0];
      console.log('Sample Order User ID:', firstOrder.user);
      
      const user = await User.findById(firstOrder.user);
      console.log('Associated User:', user ? user.name : 'Not Found');
    }

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkOrders();
