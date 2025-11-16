const express = require("express");
const authRouter = express.Router();
const {register, login, logout, adminRegister} = require("../controllers/userAuthenticate");
const userMiddleWare = require("../middleware/usermiddleWare");
const adminMiddleware = require("../middleware/adminMiddleware");

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleWare, logout);
authRouter.post('/admin/register',adminMiddleware, adminRegister);
// authRouter.get('/getProfile', getProfile);

module.exports = authRouter;
