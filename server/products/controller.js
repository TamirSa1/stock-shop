import { conncetToMongo } from "../database/connectToMongoDB.js"


async function getAllProducts(request, response) {
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const productsCollection = await db.collection("products");
    const products = await productsCollection.find({}).toArray();
    response.send(products);

}

export { getAllProducts }