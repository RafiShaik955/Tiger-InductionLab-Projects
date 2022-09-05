const express = require('express');
const router = express.Router();
var fs = require('fs');

const employeeController = require('../controllers/employee.controller');
// get all employees
router.get('/', employeeController.getEmployeeList);

// get employee by ID
router.get('/:id', employeeController.getEmployeeByID);


// get ID for Update 
router.get('/searchRecord/:firstname', employeeController.getEmployeeByName);

// create new employee
router.post('/', employeeController.uploadImage, employeeController.createNewEmployee);

// update employee
router.put('/:id',employeeController.uploadImage, employeeController.updateEmployee);

// delete employee
router.delete('/:id', employeeController.deleteEmployee);
//validate employee
router.post('/validate', employeeController.validateEmployee);

//get image
router.get('/images/test/:imageId', function (req, res) {
    fs.readFile('./public/' + req.params.imageId, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });
})
module.exports = router;

