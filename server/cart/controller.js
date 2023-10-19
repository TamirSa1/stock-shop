import { ObjectId } from "mongodb";
import { conncetToMongo } from "../database/connectToMongoDB.js";

async function insertToCart(request, response) {
    console.log(request.body);
    const cartProduct = request.body;
    const cartObject = {
        userId: new ObjectId(cartProduct.userId),
        productId: new ObjectId(cartProduct.productId),
        quantity: 1
    }
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const cartCollection = await db.collection("cart");
    let cart = await cartCollection.findOne({ userId: new ObjectId(cartProduct.userId), productId: new ObjectId(cartProduct.productId) })
    if (cart) {
        await cartCollection.updateOne(cart, { $set: { quantity: cart.quantity + 1 } })
    } else {
        await cartCollection.insertOne(cartObject)
    }
    response.send("success")
}

async function declineCart(request, response) {
    console.log(request.body);
    const cartProduct = request.body;
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const cartCollection = await db.collection("cart");
    let cart = await cartCollection.findOne({ userId: new ObjectId(cartProduct.userId), productId: new ObjectId(cartProduct.productId) })
    if (cart) {
        await cartCollection.updateOne(cart, { $set: { quantity: cart.quantity - 1 } })
    }
    response.send("success");
}

async function cartByUserID(request, response) {
    const userId = request.body.userId
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const cartCollection = await db.collection("cart");
    const pipeline = [
        {
            $match: {
                userId: new ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'products',
                localField : 'productId',
                foreignField : '_id',
                as : 'productData'
            }
        }
    ];
    let cartArray = await cartCollection.aggregate(pipeline).toArray();
    response.send(cartArray);
}

async function deleteFromCart(request, response){
    const objectIdToRemove = request.params.cartId; //כדי להעביר את האובייקט מהעגלה צריך להעביר את המוצר האמצעות האי.די שלו שמועברת דרך הפאראמס שעובר דרך הראטור
    const dbConnection = await conncetToMongo();
    const db = dbConnection.db
    const cartCollection = await db.collection("cart");
    await cartCollection.deleteOne({_id: new ObjectId(objectIdToRemove)});
    response.send("Item deleted from cart");
}

export { insertToCart , cartByUserID, deleteFromCart, declineCart}