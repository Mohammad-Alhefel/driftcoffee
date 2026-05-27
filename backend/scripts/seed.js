import 'dotenv/config';
import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@driftcoffee.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123456';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    await Admin.create({ email, password });
    console.log(`Admin created: ${email} / ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();
