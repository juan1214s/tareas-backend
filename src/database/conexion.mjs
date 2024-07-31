import mysql from "mysql"
import {config} from "dotenv"

config();

const dbSettings = {
    host: process.env.Server ,
    user: process.env.User,
    database: process.env.Database,
    password: process.env.Password
}


export const pool = mysql.createPool(dbSettings);

pool.on('connection', (connection)=>{
    console.log('La conexion fue exitosa');
})

pool.on('error', (error)=>{
    console.log(`Ocurrio un error en la conexion: ${error.message}`);
})
