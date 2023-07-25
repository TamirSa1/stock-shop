import { pool } from "../database/db.js"

async function getAllProducts(request, response) {
    try {
        const result = await pool.query("select * from products")
        response.send(result[0])
    } catch (error) {
        response.status(400).send(error)
    }
}

export { getAllProducts }