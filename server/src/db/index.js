import mysql from "mysql"
let connection;
export const connectDB = () => {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    connection.connect(function(err){
        if(err){
            console.log(err.message);
            throw err;
        }
        console.log("Successfully connected with Database");    
    })
    return connection;
    
}




