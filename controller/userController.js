


const userService=require("../service/userService");
const {validateUsername} = require("../validators/userValidator");

class UserController {

    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getAllUsers(req,res) {
        try{
            const userList=await userService.getAllUsers();
            // res.status(200).json(userList);
            // console.log(JSON.stringify(userList, null, 2));  // Log per vedere l'output completo


            res.status(200).json(userList);
        }catch(error){
            res.status(500).json({error: error.message});
        }

    }

    async updateUsername(req, res) {
        const {id} = req.params;
        const {username}=req.body;
        await userService.updateUsername(id,username);
        res.status(200).json({message:'user updated successfully.'});
    }

    async updateEmail(req, res) {
        const {id}=req.params;
        const {email}=req.body;
        await userService.updateEmail(id,email);
        res.status(200).json({message:'email updated successfully.'});
    }

    async updatePassword(req, res) {
        const {id} = req.params;
        const {password}=req.body;
        await userService.updatePassword(id,password);
        res.status(200).json({message:'password updated successfully.'});
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const userData = req.body;

        try {

            const updatedUser = await userService.updateUser(userData,id);


            res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
        } catch (error) {

            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: error.message });
        }
    }



}
module.exports= new UserController();