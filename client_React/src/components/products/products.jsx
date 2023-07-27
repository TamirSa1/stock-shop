// להציג את כל המוצרים שאני מביא מהשרת כמו בשיעור 39
// להוסיף גם חיפוש של מוצרים
// CSS :(

// import showProducts from "./showProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

const url = "http://localhost:4000/products";

function Products() {
    const [prodArray, setProdArray] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)

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
        finally{
            setLoadingProducts(false)
        }
    }
    useEffect(() => {
        getProd()
        console.log(prodArray)
    }, [])

    return (
        <div>
            <h1>Products</h1>
            {loadingProducts ? <Spinner animation="border"/> : 
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>brand</th>
                        <th>category</th>
                        <th>rating</th>
                        <th>price</th>
                        <th>title</th>
                        <th>description</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {prodArray.map((product) => {
                        return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.rating}</td>
                            <td>{product.price}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td><img src={product.images[0]} alt={product.title} /></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            }
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