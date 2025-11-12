// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     designation:String,
//     password :String
// })

// module.exports = mongoose.model("employee", employeeSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  duration: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
});

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  password: String,
  tasks: [taskSchema], 
});

module.exports = mongoose.model("employee", employeeSchema);
