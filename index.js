const express = require('express');
const cors = require('cors');
const router = require('./src/routes/tasks.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',router);


app.listen(3000,()=>{
    console.log("Listening on 3000");
})