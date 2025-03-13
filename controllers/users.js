var userSchema = require('../schemas/user')
var roleController = require('../controllers/roles')
let bcrypt = require('bcrypt')

module.exports={
    GetAllUser: async ()=>{
        return await userSchema.find({});
    },
    GetUserById:async (id)=>{
        return await userSchema.findById(req.params.id);
    },
    CreateAnUser:async (username,password,email,role)=>{
        let GetRole  = await roleController.GetRoleByName(role);
        let salt = bcrypt.genSaltSync(10);
        if(GetRole){
            newUser = new userSchema({
                username:username,
                password:bcrypt.hashSync(password,salt),
                email:email,
                role:GetRole._id
            })
            return await newUser.save();
        }else{
            throw new Error("role sai heheeheheh");
        }
    },
    UpdateUser:async function(id,UpdateObj){
        if(UpdateObj.role){
            //
        }
    }
}