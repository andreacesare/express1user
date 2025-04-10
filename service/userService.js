const userRepository=require('../repository/userRepository');
const {validateUser, validateEmail, validateUsername, validatePassword} = require("../validators/userValidator");
const bcrypt = require("bcrypt");
const UserPassword = require("../models/UserPassword");
const {getSequelize} = require("../config/configDB");
const userRoleRepository=require('../repository/userRoleRepository');
const userPasswordRepository=require('../repository/userPasswordrepository');
const {password} = require("pg/lib/native");

class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }

    async createUser(userData) {
        validateUser(userData);
        const existing = await userRepository.findByUsernameOrEmail(userData.username, userData.email);
        if (existing) {
            throw new Error("Username or password already exists");
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const transaction = await getSequelize().transaction();
        try {
            const user = await userRepository.createUser(userData, transaction);

            await userRoleRepository.assignRole({userId: user.id, roleId: 3}, transaction);


            await userPasswordRepository.savePassword({userId: user.id, password: hashedPassword}, transaction);

            await transaction.commit();
            return user;
        } catch (error) {
            await transaction.rollback();
            throw new Error("Errore nella creazione dell'utente: " + error.message);
        }
    }

    async updateUser(userData,id) {

        validateUser(userData);

        const existing = await userRepository.findByUsernameOrEmail(userData.username, userData.email);

        if (existing && existing.id !== userData.id) {
            throw new Error("Username or email already exists");
        }


        const transaction = await getSequelize().transaction();

        try {
            const user = await userRepository.updateUser(id,userData, transaction);


            if (userData.roleId) {
                await userRoleRepository.assignRole({userId: user.id, roleId: 3}, transaction);
            }

            if (userData.password) {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                await userPasswordRepository.savePassword({userId: id, password: hashedPassword}, transaction);

            }


            await transaction.commit();

            return user;
        } catch (error) {

            await transaction.rollback();
            throw new Error("Errore nell'aggiornamento dell'utente: " + error.message);
        }
    }

    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async updateUsername(userId, username) {
        validateUsername({username});
        const existing = await userRepository.findByUsernameOrEmail(username, null);
        if (existing) {
            throw new Error("Username already exists");
        }
        return await userRepository.updateUsername(userId, username);
    }

    async updateEmail(id, email) {
        validateEmail({email});
        const existing = await userRepository.findByUsernameOrEmail(null, email);
        if (existing) {
            throw new Error("Username already exists");
        }
        return await userRepository.updateEmail(id, email);
    }

    async updatePassword(id, password) {
        validatePassword({password});

        const oldPasswords = await UserPassword.findAll({
            where: {userId: id},
        });
        for (let oldPassword of oldPasswords) {
            const isSamePassword = await bcrypt.compare(password, oldPassword.password);
            if (isSamePassword) {
                throw new Error('You cannot reuse a previous password.');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userPasswordRepository.updatePassword({userId: id, password: hashedPassword});
    }


}

const instance = new UserService();
Object.freeze(instance);
module.exports= instance;