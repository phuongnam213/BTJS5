var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let users = await userController.GetAllUser();
    CreateSuccessRes(res,200,users);
});
router.get('/:id', async function(req, res, next) {
  try {
    let user = await userController.GetUserById(req.params.id)
    CreateSuccessRes(res,200,user);
  } catch (error) {
    CreateErrorRes(res,404,error);
  }
});
router.post('/', async function(req, res, next) {
    try {
      let body = req.body
      let newUser = await userController.CreateAnUser(body.username,body.password,body.email,body.role);
      CreateSuccessRes(res,200,newUser);
    } catch (error) {
      next(error);
    }
})
router.put('/:id', async function(req, res, next) {
  
})



module.exports = router;
