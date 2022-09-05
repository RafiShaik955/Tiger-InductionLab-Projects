var dbConn = require('../config/db.config');

class Employee {
    constructor(employee) {
        this.firstname = employee.firstname;
        this.lastname = employee.lastname;
        this.email = employee.email;
        this.password =employee.password;
        this.gender = employee.gender;
        this.phonenumber  = employee.phonenumber;
        this.dateofbirth = employee.dateofbirth;
        this.image = employee.image;
        this.address = employee.address;
    }
    // get all employees
    static getAllEmployees(result) {
        dbConn.query('SELECT * FROM employee', (err, res) => {
            if (err) {
                console.log('Error while fetching employess', err);
                result(null, err);
            } else {
                console.log('Employees fetched successfully', res, "result");
                result(null, res);
            }
        });

    }
    // get employee by Name for Search Data by name 
    static getEmployeeByName(first_name, result) {
        dbConn.query('SELECT * FROM employee WHERE firstname=?', first_name, (err, res) => {
            if (err) {
                console.log('Error while fetching employee by id', err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
    // create new employee
    static createEmployee(employeeReqData, result) {
        const EmployeeArray = Object.entries(employeeReqData).map((item, index) => {
            return item[1];
        });
        // EmployeeArray.unshift(1253);
        const ite = 1 ;
        // console.log(employeeReqData,"requested data");
        dbConn.query('INSERT INTO employee (firstname,lastname,email,password,gender,phonenumber,dateofbirth,image,address) VALUES (?)', [EmployeeArray], (err, res) => {
            if (err) {
                console.log('Error while inserting data', err);
                result(null, "already exists");
            } else {
                console.log('Employee created successfully');
                result(null, res);
            }
        });
    }
    // get employee by ID for update
    static getEmployeeByID(id, result) {
        dbConn.query('SELECT * FROM employee WHERE id=?', id, (err, res) => {
            if (err) {
                console.log('Error while fetching employee by id', err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    // update employee
    static updateEmployee(id, employeeReqData, result) {
        console.log(employeeReqData,"in db")
        dbConn.query(`UPDATE employee SET firstname=?,lastname=?,email=?,password=?,gender=?,phonenumber=?,dateofbirth=?,image=?,address=? WHERE id = ?`, [employeeReqData.firstname, employeeReqData.lastname,employeeReqData.email,employeeReqData.password,employeeReqData.gender,employeeReqData.phonenumber,employeeReqData.dateofbirth,employeeReqData.image,employeeReqData.address, id], 
        // dbConn.query("UPDATE employee SET firstname=? WHERE id = ?",["updatedqy","11"], 
        (err, res) => {
            console.log("err-",err,"res-",res);
            if (err) {
                console.log('Error while updating the employee');
                result(null, "updation is not sucessfull");
            } else {
                console.log("Employee updated successfully");
                // console.log("")
                result(null, res);
            }
        });
    }
    // delete employee
    static deleteEmployee(id, result) {
        dbConn.query('DELETE FROM employee WHERE id=?', [id], (err, res) => {
            if (err) {
                console.log('Error while deleting the employee');
                result(null, err);
            } else {
                result(null, res);
            }
        });
        // dbConn.query("UPDATE employees SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        //     if(err){
        //         console.log('Error while deleting the employee');
        //         result(null, err);
        //     }else{
        //         console.log("Employee deleted successfully");
        //         result(null, res);
        //     }
        // });
    }

    //validate employee
    static validateEmployee(employeeCreditionals,result){
        const email = employeeCreditionals.email;
        const password = employeeCreditionals.password;
        dbConn.query('SELECT * FROM employee WHERE email=? AND password=?',[email,password],(err,res)=>{
            if (err) {
                console.log('Error while validating the employee');
                result(null, err);
            } else {
                result(null, res);
            }
            
            
        })
        // console.log(email,password);
        // console.log(result);
    }
}









module.exports = Employee;