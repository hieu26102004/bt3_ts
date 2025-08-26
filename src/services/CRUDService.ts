
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

const createNewUser = async (data: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });
            resolve('OK create a new user successfull');
        } catch (e) {
            reject(e);
        }
    });
};

const hashUserPassword = (password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

const getAllUsers = (): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

const getUserInfoById = (userId: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
}

const updateUser = (data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allusers = await db.User.findAll();
                resolve(allusers);
            }else{
                resolve(undefined);
            }
        } catch (e) {
            reject(e)
        }
    })
}

//hàm xóa user
const deleteUserById = (userId: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id : userId }
            })
            if(user){
                user.destroy();
            }
            resolve(undefined);
        } catch (e) {
            reject(e);
        }
    })
}
export default {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUser,
    deleteUserById
};
