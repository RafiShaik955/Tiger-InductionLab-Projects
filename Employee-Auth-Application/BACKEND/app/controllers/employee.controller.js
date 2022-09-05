const multer = require("multer")

const EmployeeModel = require('./employee.model');
var IMAGE_DATA = ""

const multerConfig= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public/');
    },
    filename:(req,file,callback)=>{
        const ext = file.mimetype.split('/')[1];
        IMAGE_DATA = `image-${Date.now()}.${ext}`
        callback(null,IMAGE_DATA);
    }
});

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }
    else{
        callback(new Error('only Image is Allowed...'));
    }
}

const upload = multer({
    storage:multerConfig,
    fileFilter:isImage,
});


exports.uploadImage = upload.single('photo');
console.log(this.uploadImage,"console ");


// get all employee list
exports.getEmployeeList = (req, res) => {
    //console.log('here all employees list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if (err)
            res.send(err);
        console.log('Employees', employees);
        res.send(employees)
    })
}

// get employee by Name for earch by Name 
exports.getEmployeeByName = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByName(req.params.firstname, (err, employee) => {
        if (err)
            res.send(err);
        console.log('single employee data', employee);
        res.send(employee);
    })
}


// create new employee
exports.createNewEmployee = (req, res) => {
    const {file} = req;
    let formData = JSON.parse(req.body.file);
    formData = {...formData,image:IMAGE_DATA};
    // console.log(imageData);
    const employeeReqData = new EmployeeModel(formData);
    console.log('employeeReqData', employeeReqData);
    console.log('employeeReqData imagee', file);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Employee Created Successfully', data: employee })
        })
    }
}


// get employee by ID  for Update 
exports.getEmployeeByID = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
        if (err)
            res.send(err);
        console.log('single employee data', employee);
        // res.json({"first_name":"Dheeraj"});
        res.send(JSON.stringify({  employee }));
    })
}


// update employee
exports.updateEmployee = (req, res) => {
    const {file} = req;
    let formData = JSON.parse(req.body.file);
    formData = {...formData,image:IMAGE_DATA};
    console.log(formData,"update");
    // console.log(req.body,"from frontend");
    const employeeReqData = new EmployeeModel(formData);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        EmployeeModel.updateEmployee(formData.id, employeeReqData, (err, employee) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Employee updated Successfully' })
        })
    }
}

// delete employee
exports.deleteEmployee = (req, res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Employee deleted successully!' });
    })
}


exports.validateEmployee=(req,res)=>{
    
    EmployeeModel.validateEmployee(req.body,(err,employee)=>{
        if(err)
            res.send(err)

        if(employee.length>0){
            res.send({exists:"yes",employeeDetails:employee});
            console.log("creditionals are valid");
        }
        else{
            res.send({exists:"no"})
            console.log("creditionals are invalid");
        }
        
    })
}