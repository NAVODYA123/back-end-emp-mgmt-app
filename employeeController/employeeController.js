const db = require('../dbConfig/firestore')
console.log('reached controller')
const fs = require('fs')
const path = require('path');

const testbb = require('../assets/employees.json')

const empCollection = db.collection('employees')

let relativePath ='./assets/employees.json'
let absolutePath = path.resolve(relativePath);



//adding data using a json file
const bulkDataUpdate = async () => {
    try {
        console.log(absolutePath)
        fs.readFile(absolutePath, { encoding: 'utf8' }, (err, empData) => {
            console.log('printing data')
        
            if (err) {
                console.log(err)
            } else {
                const convertedData = JSON.parse(empData).map((emp) => {
                    console.log(emp.id)
                    empCollection.doc(emp.id).set({
                        firstname: emp.first_name,
                        lastname: emp.last_name,
                        email: emp.email,
                        number: emp.number,
                        gender: emp.gender,
                        id: emp.id,
                        photo: emp.photo,
                    })
                })
            }
        }
        )
    } catch (err) {
        console.log('error')
    }
}

//one time use import all employee data from JSON files
const importAll = async (req, res) => {
    console.log('reached bulk import')
    await bulkDataUpdate()
    res.send('post request')
}

//add one employee
const addNewEmployee = async (req, res) => {
    console.log('ádded new employee')
    await empCollection.doc('13').set({
        firstname: 'ama',
        lastname: 'silva',
        email: 'ama@gmail.com',
        number: '0771234555',
        gender: 'F',
        id: '13',
        photo: '',
    })
    res.send('Added new employee record')
}

//get single employee record
const getEmployee = async (req, res) => {
    const querySnapShot = await empCollection.doc(req.params.id).get()
    //  const empRecord = querySnapShot.docs.map((doc) => doc.data())
    //  console.log('empRecord',empRecord)
     res.send(querySnapShot)     

}

//get all emplyees
const getEmployeeList = async (req, res) => {
    console.log('get single employee method reached')
     const querySnapShot = await empCollection.get()
     const list = querySnapShot.docs.map((doc) => doc.data())
     console.log('list',list)
     res.send(list)     
}

//update employee
const updateEmployeeDetails = async (req, res) => {
    console.log('update method reached')
    const empId = req.params.id
    await empCollection.doc(empId).update({
        firstname: 'Lihini',
        lastname: 'Navodya',
    })
    res.send('employee details updated successfully')
}


//delete employee
const deleteEmployee = async (req, res) => {
    console.log('delete method exceuted')
    const empId = req.params.id
    await empCollection.doc(empId).delete();
    res.send('employee deleted')
}
//   getEmployeeList,
//   getEmployee,
//   getEmployeeList,
//   updateEmployeeDetails,
//   deleteEmployee,

module.exports = { addNewEmployee, getEmployeeList, importAll, deleteEmployee, updateEmployeeDetails, getEmployee}