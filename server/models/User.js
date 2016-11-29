let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  userName: String,
  _tasks: [{type: Schema.ObjectId, ref: 'Task'}],
  tagline: String,
  bio: String,
  password: String,
  admin: Boolean
},
{
  timestamps: true
});

mongoose.model('User', UserSchema);
// let User = mongoose.model('User');
// User.create({firstName: 'testname', lastName: 'testlastname', age: 30, userName: 'sillabus', password: 'Hash'}, (err, data) => {
//   if (err) {
//     console.log('There was a problem creating the test user.');
//   } else {
//     console.log('Test user ' + data);
//   }
// });
