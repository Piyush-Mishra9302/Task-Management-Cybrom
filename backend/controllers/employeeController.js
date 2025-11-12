const Employee = require("../models/employeeModel");

const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee || employee.password !== password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Login successful",
      employee: {
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getEmployeeTasks = async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json(employee.tasks || []);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tasks", error });
  }
};

module.exports = { employeeLogin, getEmployeeTasks };
