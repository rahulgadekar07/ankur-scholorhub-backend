require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createUser() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not found in environment variables');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = new User({ email: 'admin@example.com', password: hashedPassword, role: 'admin' });

  await user.save();
  console.log('User created');
  await mongoose.disconnect();
}

createUser().catch(console.error);
