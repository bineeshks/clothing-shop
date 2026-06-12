const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/vellora').then(async () => {
  const User = mongoose.model('User', new mongoose.Schema({ password: String }, { strict: false }));
  const singleHashed = await bcrypt.hash('admin123', 10);
  await User.updateOne({ email: 'admin@vellora.com' }, { $set: { password: singleHashed } });
  console.log('Password fixed to single-hashed version!');
  process.exit(0);
});
