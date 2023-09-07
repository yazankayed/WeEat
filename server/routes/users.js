// const express = require('express');
const userController = require('../controllers/users');
// const checkAuth = require('../middleware/checkauth');
// const router = express.Router();
module.exports = function (app) {
app.post('/users' , userController.signup);
app.post('/login' , userController.login);
app.post('/clear' , userController.clear);//only for development purpose
// app.use(checkAuth);//authentication middleware
app.get('/logout', userController.logout);
app.post('/order',userController.order);
}
// module.exports = router;