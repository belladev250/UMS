const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const router = require('./routes/authentication')
const route = require('./routes/restapis')
require('./config/db');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/auth',router)
app.use('/api/user',route)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

const port =7000;

app.listen(port,()=>{
    console.log("server is running on port"+" "+port);
})
