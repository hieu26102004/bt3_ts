import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    gender: Boolean,
    roleId: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const createNewUser = async (data: any): Promise<string> => {
    console.log('[MongoCRUDService] createNewUser called');
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        const user = new User({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        });
        await user.save();
        return 'OK create a new user successfull';
    } catch (e) {
        throw e;
    }
};

const hashUserPassword = async (password: string): Promise<string> => {
    try {
        let hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

const getAllUsers = async (): Promise<any[]> => {
    console.log('[MongoCRUDService] getAllUsers called');
    try {
        let users = await User.find({}).lean();
        return users;
    } catch (e) {
        throw e;
    }
};

const getUserInfoById = async (userId: any): Promise<any> => {
    console.log('[MongoCRUDService] getUserInfoById called');
    try {
        let user = await User.findById(userId).lean();
        return user || [];
    } catch (e) {
        throw e;
    }
};

const updateUser = async (data: any): Promise<any> => {
    console.log('[MongoCRUDService] updateUser called');
    try {
        let user = await User.findById(data.id);
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allusers = await User.find({});
            return allusers;
        } else {
            return;
        }
    } catch (e) {
        throw e;
    }
};

const deleteUserById = async (userId: any): Promise<void> => {
    console.log('[MongoCRUDService] deleteUserById called');
    try {
        await User.findByIdAndDelete(userId);
        return;
    } catch (e) {
        throw e;
    }
};

export default {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUser,
    deleteUserById
};
