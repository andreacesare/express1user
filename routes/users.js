const express = require('express');

const router = express.Router();
const userController = require("../controller/userController");



router.post("/createUser",userController.createUser);

router.get("/",userController.getAllUsers);

router.put("/updateUsername/:id",userController.updateUsername);

router.put("/updateEmail/:id",userController.updateEmail);

router.put("/updatePassword/:id",userController.updatePassword);

router.put("/updateUser/:id",userController.updateUser);

module.exports = router;
