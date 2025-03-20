var userSchema = require('../schemas/user')
var roleController = require('../controllers/roles')
let bcrypt = require('bcrypt')

module.exports = {
    GetAllUser: async () => {
        return await userSchema.find({});
    },
    GetUserById: async (id) => {
        return await userSchema.findById(req.params.id);
    },
    CreateAnUser: async (username, password, email, role) => {
        let GetRole = await roleController.GetRoleByName(role);
        if (GetRole) {
            newUser = new userSchema({
                username: username,
                password: password,
                email: email,
                role: GetRole._id
            })
            return await newUser.save();
        } else {
            throw new Error("role sai heheeheheh");
        }
    },
    UpdateUser: async function (id, body) {
        let allowFields = ["password", "email", "imgURL"];
        let user = await userSchema.findById(id);
        if (user) {
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    user[key] = body[key]
                }
            }
            return await user.save();
        }
    }
}