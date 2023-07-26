import axios from "axios";
import {conncetToMongo} from "../database/connectToMongoDB.js"

async function insertProducts() {
    try {
        const result = await axios.get("https://dummyjson.com/products?limit=100")
        console.log(result.data.products);
        const productsArray = result.data.products;
        const dbConnection = await conncetToMongo();
        const db = dbConnection.db
        const productsCollection = await db.collection("products"); 
        for (let index = 0; index < productsArray.length; index++) {
            const element = productsArray[index];
            await productsCollection.insertOne(element)
        }
    } catch (error) {
        console.log(error);
    }
}

insertProducts();
// to run the script open server folder terminal  - node script/script.js