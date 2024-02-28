/**
 * This will be the starting file of the project
 */
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const server_config = require('./configs/server.config');
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs')
/**
 * Create an Admin User at the starting of the application
 * If not already present
*/

//2. Connection with mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("Error while connecting to the mongoDB")
})
db.once("open", () => {
    console.log("Connected to MongoDB")
    init()
})

async function init() {
    let user = await user_model.findOne({ userId: "admin" })
    if (user) {
        console.log("Admin is already present")
        return
    }
    try {
        user = await user_model.create({
            name: "Hussain",
            userId: "admin",
            email: "hussainwazeeri@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 8) //8 is value of salt
        })
        console.log("Admin created", user)
    }
    catch (err) {
        console.log("Erro while creating admin", err)
    }
}



/**
 * 1. Start the server
 */

app.listen(server_config.PORT, () => {
    console.log("Server has listing at port:", server_config.PORT)
})