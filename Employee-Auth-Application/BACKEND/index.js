const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

const app = express();

app.use(cors())
// create express app

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
// import employee routes
const employeeRoutes = require('./app/routes/employee.route');

// create employee routes
app.use('/api/employee', employeeRoutes);

// listen to the port
app.listen(port, () => {
    console.log(`Express is running at port ${port}`);
});


