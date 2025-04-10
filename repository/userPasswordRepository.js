const userPassword=require('../models/userPassword');

class UserPasswordRepository {
    constructor() {
        if(!UserPasswordRepository.instance) {UserPasswordRepository.instance = this;}
        return UserPasswordRepository.instance;
    }

    async savePassword(data,transaction) {
        try{
            console.log("Dati ricevuti per il salvataggio password:", data);
            await userPassword.create(data,{transaction});
        }
        catch(error){
            console.log(error);
            throw new Error("UserPassword creation failed");}
    }

    async updatePassword(id,data){
        try {
            const a=await userPassword.create(id,data);
            console.log(a);
        }catch(error){
            console.log(error);
            throw new Error("UserPassword update failed");
        }

    }

    async  checkPasswordExpiration(userId) {
        const lastPassword = await userPassword.findOne({
            where: { userId },
            order: [['createdDate', 'DESC']]
        });

        if (!lastPassword) {
            throw new Error("Password non trovata");
        }

        const lastDate = moment(lastPassword.createdDate);
        const daysPassed = moment().diff(lastDate, 'days');

        return daysPassed > 90;
    }


}
instance=new UserPasswordRepository();
Object.freeze(instance);
module.exports = instance;