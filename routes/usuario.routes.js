const { Router } = require("express");
const authController = require("../controllers/usuario.controller");
const router = Router();


router.post('/login', authController.loginJWT)
router.post('/basic-login', authController.loginBasic)
router.post('/register', authController.register)





module.exports = router;