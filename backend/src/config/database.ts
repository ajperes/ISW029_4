import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../models/Product';
import { Supplier } from '../models/Supplier';
import { History_Buy } from '../models/History_Buy';


dotenv.config();


const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    models: [ Product, Supplier, History_Buy],
});


export default sequelize;