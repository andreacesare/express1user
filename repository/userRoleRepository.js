const UserRole=require('../models/userRole');

class UserRoleRepository {

    constructor() {
        if(!UserRoleRepository.instance) {
            UserRoleRepository.instance =this;
        }
        return UserRoleRepository.instance;
    }

    async assignRole(userData,transaction){
        try{
            await UserRole.create(userData,{transaction});
        }catch(err){

            console.error('Error while assigning role:', err);


            throw new Error(`UserRole creation failed. Details: ${err.message}`);

    }

}
}

const instance = new UserRoleRepository();
Object.freeze(instance);
module.exports = instance;