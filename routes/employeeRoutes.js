const express = require('express')
const router = express.Router()
const employeeController = require('../employeeController/employeeController')

const {
  addNewEmployee,
  getEmployeeList,
  importAll,
  deleteEmployee,
  updateEmployeeDetails,
  getEmployee,
} = employeeController

// console.log('route page reached working')

//get all emplyees
router.get('/list', getEmployeeList)

//get one employee
router.get('/:id', getEmployee)

//add new employee
router.post('/add', addNewEmployee)

//one time use import all employee data from JSON files
router.post('/import', importAll)

//update employee
router.patch('/update/:id', updateEmployeeDetails)

//delete employee
router.delete('/delete/:id', deleteEmployee)

module.exports = router
