
const empModel=require('../db/empSchema');
const getdata=()=>{
    empModel.find({},(err,data)=>{
        if(err){
            return err;
        }
        else{
                return data
            }
        
    })
}
const postdata=async(data)=>{
    let empid=data.empid;
    let firstname=data.firstname;
    let lastname=data.lastname;
    let username=data.username;
    let email=data.email;
    let password=data.password
    let emp_ins=new empModel({empid:empid,firstname:firstname,lastname:lastname,username:username,email:email,password:password})
    await emp_ins.save((err)=>{
        if(err){ return err;
    }
    else{
        return("added suuccessfully")
    }
})
}
const deldata=async(empid)=>{
    await empModel.deleteOne({empid:empid},(err)=>{
        if(err) throw err;
        else{
            console.log("deleted data")
        }
    })
}
const upddata=async(email,data)=>{
    await empModel.updateOne({email:email},{$set:data},(err,data)=>{
        if(err) throw err;
        else{
            console.log("updated data")
        }
    })
}
const login=(data)=>{
    empModel.findOne({email:data.email,password:data.password}, (err, info)=>{
        if(err) {
            console.log(err);
            }
            else{
                return info
            }
    })
    }
module.exports={getdata,postdata,deldata,upddata,login};