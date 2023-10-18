import { pool } from "../database/db.js"
import {conncetToMongo} from "../database/connectToMongoDB.js"
import bcrypt from "bcrypt"

const url = "mongodb+srv://tscb93:VLrNkt39FfcKcJm3@cluster0.rdkykcp.mongodb.net/"
// const MongoClient = require('mongodb').MongoClient;
import { MongoClient } from "mongodb"

async function createUser(request, response) {
    console.log(request.body);
    const userDetails = request.body
    try {
        await pool.query(`INSERT INTO users(name , email , phone , password) VALUES('${userDetails.name}','${userDetails.email}','${userDetails.phone}','${userDetails.password}')`)
        response.send({success : true})
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

async function createUserToMongoDB(request, response) {
    const userDetails = request.body
    console.log(userDetails)
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const usersCollection = await db.collection("users");
    const saltRounds = 10;
    const myPlaintextPassword = userDetails.password
    bcrypt.genSalt(saltRounds, function(err, salt) { 
        bcrypt.hash(myPlaintextPassword, salt, async function(err, hash) {
            // Store hash in your password DB.
            userDetails.password = hash;
            // userDetails.salt = salt; // saltשמירה של ה
            await usersCollection.insertOne(userDetails)
            response.send({success : true})
        });
    });
   
}

export { createUser , createUserToMongoDB}