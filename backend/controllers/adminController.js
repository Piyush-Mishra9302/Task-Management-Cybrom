const AdminModel = require("../models/adminModel");
const UserPassword = require("../middlewears/randomPassword");
const EmailSend = require("../middlewears/empMailSend");
const EmpModel = require("../models/employeeModel")
const adminLogin = async(req,res) => {
   
    const {email, password} = req.body;
    try {
         const Admin = await AdminModel.findOne({email:email});

    if(!Admin || Admin.password != password )
    {
        res.status(401).send({mag:"Invalid Email or password"});
    } else {
        res.status(200).send({Admin:Admin, msg:"Successfully Login"});
    }
    } catch (error) {
        console.log(error);
    }  
}

const userCreate = async (req, res) => {
    try {
         const {empname, empemail, designation} = req.body;
    const emppassword = UserPassword.myPassword();
    
    const emailResult = await EmailSend.userMailsender(empname,empemail,emppassword);
     if(!emailResult){
        return res.status(400).json({msg : "Invalid email or email not send"})
     }
     const Employee = await EmpModel.create({

        name: empname,
        email: empemail,
        designation: designation,
        password: emppassword
    });
        console.log("User created successfully")
       res.status(201).json({ message: "User successfully created!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });   
    }
   
}   


const getAllUsers = async (req, res) => {
  try {
    const employees = await EmpModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, duration, priority } = req.body;

    const employee = await EmpModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newTask = { task, duration, priority };
    employee.tasks.push(newTask);
    await employee.save();

    res.status(200).json({ message: "Task assigned successfully", employee });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Error assigning task", error });
  }
};

const sendTaskReport = async (req, res) => {
  try {
    const { email, taskId, report } = req.body;
    const employee = await EmpModel.findOne({ email });

    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    const task = employee.tasks.id(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.report = report;
    task.reportedAt = new Date();
    await employee.save();

    res.json({ msg: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while sending report" });
  }
};


module.exports ={
    adminLogin,
    userCreate,
    getAllUsers,
    assignTask,
    sendTaskReport
}