let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  projectName: String,
  _tasks: [{type:Schema.ObjectId, ref: 'Task'}],
  team: [{type:Schema.ObjectId, ref: 'User'}]
},
{
  timestamps: true
});

mongoose.model('Project', ProjectSchema);

let Project = mongoose.model('Project');
// Project.create({projectName: 'Test'}, (err, data) => {
//   if (err) {
//     console.log('THere was a error creating the test Project');
//   } else {
//     console.log('Test  ' + data);
//   }
// });
