// להציג את כל המוצרים שאני מביא מהשרת כמו בשיעור 39
// להוסיף גם חיפוש של מוצרים
// CSS :(

// import showProducts from "./showProducts";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:4000/products";

function Products() {
    const [prodArray, setProdArray] = useState([])

    async function getProd() {
        try {
            const result = await axios.get(url, {
            })
            console.log(result.data);
            if (Array.isArray(result.data)) {
                setProdArray(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProd()
        console.log(prodArray)
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ProductID</th>
                        <th>ProductName</th>
                        <th>SupplierID</th>
                        <th>CategoryID</th>
                        <th>Unit</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {prodArray.map((product) => {
                        return (
                        <tr key={product.ProductID}>
                            <td>{product.ProductID}</td>
                            <td>{product.ProductName}</td>
                            <td>{product.SupplierID}</td>
                            <td>{product.CategoryID}</td>
                            <td>{product.Unit}</td>
                            <td>{product.Price}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

{/*
 <div>
<h1>Products</h1>
<table>
    <thead>
        <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>SupplierID</th>
            <th>CategoryID</th>
            <th>Unit</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        {products.map((product, index) => {
            <tr key={product.ProductID}>
                <td>{product.ProductID}</td>
                <td>{product.ProductName}</td>
                <td>{product.SupplierID}</td>
                <td>{product.CategoryID}</td>
                <td>{product.Unit}</td>
                <td>{product.Price}</td>
            </tr>
        })}
    </tbody>
</table>
</div>
 */}


export default Products;