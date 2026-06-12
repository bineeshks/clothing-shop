const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wayand').then(async () => {
  const User = mongoose.model('User', new mongoose.Schema({ email: String }, { strict: false }));
  const users = await User.find({});
  console.log('All users:', users);
  
  if (users.length > 0 && users[0].email) {
    console.log('Updating first user email to admin@vellora.com');
    await User.updateOne({ _id: users[0]._id }, { $set: { email: 'admin@vellora.com' } });
  }

  process.exit(0);
});
