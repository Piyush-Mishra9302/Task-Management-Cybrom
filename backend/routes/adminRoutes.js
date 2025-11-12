const express = require("express");
const route = express.Router();
const AdminController = require("../controllers/adminController");
const EmployeeController = require("../controllers/employeeController");

route.post("/login", AdminController.adminLogin);
route.post("/usercreate", AdminController.userCreate);
route.get("/allusers", AdminController.getAllUsers);
route.post("/assign-task/:id", AdminController.assignTask);

//employee route
route.post("/employee-login", EmployeeController.employeeLogin);
route.post("/get-employee-tasks", EmployeeController.getEmployeeTasks);
route.post("/send-task-report", AdminController.sendTaskReport);



module.exports = route;