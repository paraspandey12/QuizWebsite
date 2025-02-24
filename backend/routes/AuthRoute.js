const express= require("express")
const router= express.Router()
const userController= require("../controllers/UserController")


router.get("/getUser",userController.getUser)
router.get("/getCurrentUser",userController.getCurrentUser)
router.post("/register",userController.registration)
router.post("/login",userController.login)
router.get("/getrole", userController.getUserRole)
router.get("/getuserId", userController.getuserId)
router.post("/make-admin", userController.makeAdmin);
router.post("/remove-admin", userController.removeAdmin);

  
module.exports = router;