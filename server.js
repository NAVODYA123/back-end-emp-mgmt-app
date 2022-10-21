const express = require('express')
const app = express()
// const admin = require('firebase-admin')
// const credentials = require('./key.json')

// admin.initializeApp({
//     credential: admin.credential.cert(credentials),
// })

// const db = admin.firestore()

const db = require('./dbConfig/firestore')

const fs = require('fs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${3000}`)
})

//adding data using a json file

const bulkDataUpdate = async () => {
    try {
        fs.readFile('./assets/employees.json', { encoding: 'utf8' }, (err, empData) => {
            console.log('printing data')
            if (err) {
                console.log(err)
            } else {
                const convertedData = JSON.parse(empData).map((emp) => {
                    console.log(emp.id)
                    db.collection('employees').doc(emp.id).set({
                        first_name: emp.first_name,
                        last_name: emp.last_name,
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
app.post('/employee/import', async (req, res) => {
    bulkDataUpdate()
    res.send('post request')
})

//add single employee record to collection
app.post('/employee/add', async (req, res) => {
  
    res.send('Added new employee record')
})

//update existing employee record
app.post('/employee/update/id', async (req, res) => {

    res.send('update employee record')
})

//connect to serve from front end
app.get('/', (req, res) => {
    res.send('Hello Lihini aye !')
  })


//get list of all employees
app.get('/employee', async (req, res) => {
     const empCollection = db.collection('employees')
     const querySnapShot = await empCollection.get()
     const list = querySnapShot.docs.map((doc) => doc.data())
     console.log('list',list)
     res.send(list)     
})  



