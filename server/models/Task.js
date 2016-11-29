let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: String,
  taskBody: String,
  _user: {type: Schema.ObjectId, ref: 'User'},
  // _project: {type: Schema.ObjectId, ref: 'Project'},
  completed: Boolean
},
{
  timestamps: true
});

mongoose.model('Task', TaskSchema);
// let Task = mongoose.model('Task');
// Task.create({taskName: 'Test', taskBody: 'We are testing', completed: false}, (err, data) => {
//   if(err){
//     console.log("There was a problem creating the test task.");
//   } else {
//     console.log('Test Task ' + data);
//   }
// });
