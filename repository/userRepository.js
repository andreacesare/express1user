
const{Op}=require('sequelize');

const {Role,User}=require('../associations/associations');

class UserRepository {

    constructor() {
        if(!UserRepository.instance){
            UserRepository.instance = this;
        }
        return UserRepository.instance;
    }

    async createUser(userData,transaction) {
        return  User.create(userData,{transaction});
    }

    async getAllUsers() {
        return  User.findAll({
            include: {
                model: Role,
                as:'roles',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
    }

    async findByUsernameOrEmail(username, email) {
        return await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });
    }

    async updateUsername(id,username){
        return  User.update({username},{where:{id}});
    }

    async updateEmail(id,email){
        return User.update({email},{where:{id}});
    }

}
const instance=new UserRepository();
Object.freeze(instance);
module.exports = instance;