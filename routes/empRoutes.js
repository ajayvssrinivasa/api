const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtsecret = 'anfksfderlkld9343kl';
const empModel=require('../db/empSchema')
const { body,check,validationResult } = require('express-validator');
const db=require('../config/db');
const {getdata,postdata,deldata,upddata, login}=require('../Controller/Controller');
const { validateUser } = require('./validator');
db();
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}
router.get('/getdata',(req,res)=>{
    getdata();
    res.send("get the data")

})
router.post('/postdata',validateUser,
// check('firstname', 'firstName length should be 4 characters')
// .isLength({ min: 5}),
// check('lastname', 'lastName length should be 2 characters')
// .isLength({ min: 5}),
// check('empid', 'empid length should be 3 characters')
// .isLength({ min: 3}),
// check('username', 'userName length should be 5 characters')
// .isLength({ min: 5}),
// body('email').isEmail().normalizeEmail(),
// body('password').isLength({min: 6}),
async(req,res)=>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.json(errors)
    // }
    // else {
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let username=req.body.username;
        let email=req.body.email;
        let empid=req.body.empid;
        let password=req.body.password;
        const hash = bcrypt.hashSync(password, saltRounds);
        let data={firstname:firstname,lastname:lastname,username:username,email:email,empid:empid,password:hash};
        const postdata1 = await postdata(data);
        res.json({data:postdata1});
      
    // }
    
})
router.delete('/deldata/:empid',authenticateToken,(req,res)=>{
   const empid=req.params.empid
   deldata(empid)
   res.send("deleted")
})
router.put('/upddata/:email',authenticateToken,validateUser,(req,res)=>{
    const email=req.params.email;
    upddata(email,req.body);
    res.send("updated")
})
router.post('/login',body('email').isEmail().normalizeEmail(),
body('password').isLength({
    min: 6
}),
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        empModel.findOne({email:req.body.email}, (err, info)=>{
            if(err) {
                console.log(err);
                }
                else{
                    if(bcrypt.compareSync(req.body.password, info.password)){
                        let payload={
                            uid:req.body.empid
                        }
                        const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                            res.json({err:0, msg: "Logged in successfully","token":token})
                        }
                        else{
                            res.send("password wrong")
                        }
                }
        })
        
     
    }

})
module.exports=router;