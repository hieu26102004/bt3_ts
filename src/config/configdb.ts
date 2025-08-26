import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

const connectDB = async () => {
    const env = process.env.NODE_ENV || 'development';
    // const env = process.env.NODE_ENV || 'development_mongo';
    console.log('DEBUG NODE_ENV:', env);
    if (env === 'development_mongo') {
        // Kết nối MongoDB
        try {
            await mongoose.connect('mongodb://localhost:27017/mongodb');
            console.log('MongoDB connected');
        } catch (error) {
            console.error('Unable to connect to MongoDB:', error);
        }
    } else {
        // Kết nối MySQL
        const sequelize = new Sequelize('node_fulltask', 'root', '123456', {
            host: 'localhost',
            dialect: 'mysql',
            logging: false
        });
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default connectDB;
