import Employee from "../models/employee";
import {MongoClient} from 'mongodb'
const url = 'mongodb://localhost/angular-auth'


export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function createEmployee(req, res) {
  try {
    const employee = new Employee({
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
    });

    await employee.save();
    res.json({ ok: true, message: "Employee created" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}


export async function getEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function editEmployee(req, res) {
  try {
    const { id } = req.params;
    await Employee.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ ok: true, message: "Employee Updated" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}

export async function deleteEmployee(req, res) {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ ok: true, message:"Employee Deleted" });
  } catch (error) {
    res.status(500).json({ok: false, error});
  }
    
}


