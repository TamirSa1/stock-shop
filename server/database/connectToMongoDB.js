import {MongoClient} from "mongodb";
// const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://tscb93:VLrNkt39FfcKcJm3@cluster0.rdkykcp.mongodb.net/"

async function conncetToMongo() {
    const connection = await MongoClient.connect(url).then((client) => {
        return {
            client,
            db: client.db("store"),
        };
    })
    return connection
}

export {conncetToMongo}