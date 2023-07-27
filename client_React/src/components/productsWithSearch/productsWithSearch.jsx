import axios from "axios";
import { useEffect, useState } from "react";
import ProductComponent from './productComponent';

const searchProducts = "http://localhost:4000/products";

export default function ProductsWithSearch() {
    const [prodArray, setProdArray] = useState([]); // first array
    const [filteretAfterSearch, setFilteretAfterSearch] = useState([]); // new filtered array
    const [valueSearch, setValueSearch] = useState(""); // start with empty value in the input

    async function getProductsWithSearch() {
        try {
            const result = await axios.get(searchProducts, {
            })
            console.log(result.data);
            if (Array.isArray(result.data)) {
                setProdArray(result.data)
                setFilteretAfterSearch(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProductsWithSearch()
    }, [])

    function searchProduct() {
        let arrayBySearch = prodArray.filter(a => a.ProductName.toLowecase().includes(valueSearch.toLowerCase()))
        console.log(arrayBySearch);
        setFilteretAfterSearch(arrayBySearch)
    }

    return (
        <div>
            <h1>All our products</h1>
            <input placeholder="search product" value={valueSearch} onChange={(e) => setValueSearch(e.target.value)}></input>
            <button onClick={searchProduct}>click</button>
            {filteretAfterSearch.map((oneProduct) => {
                return (
                  <ProductComponent key={oneProduct._id} element={oneProduct}></ProductComponent>
                )
            })}
        </div>
    )
}