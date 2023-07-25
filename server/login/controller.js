import { conncetToMongo } from "../database/connectToMongoDB.js";
import bcrypt from "bcrypt";

async function userLogin(request, response) {
    console.log(request.body);
    const userLogin = request.body
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db;
    const usersCollection = await db.collection("users");
    const user = await usersCollection.findOne({ email: userLogin.email })
    console.log(user);
    if (user === null) {
        response.send("Couldn't find user")
    }
    else {
        bcrypt.compare(userLogin.password, user.password, function (err, result) {
            if (result == false) {
                response.send("Couldn't find user")
            } else {
                response.send(user);
            }
        });
    }
}

export { userLogin }