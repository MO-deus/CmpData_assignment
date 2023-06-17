
const mongoose = require("mongoose");

const DB_Connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected : ",connect.connection.name ,connect.connection.host);

    } catch (error) {
        console.log(error);
        return (1);
    }
}

module.exports = {DB_Connection};