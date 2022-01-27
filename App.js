const express = require('express');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const empRoutes = require('./routes/empRoutes');
app.use("/api/employee",empRoutes);
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`work on ${PORT}`);
})