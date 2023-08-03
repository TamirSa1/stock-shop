import axios from "axios";
import { useEffect, useState } from "react";
import ProductComponent from './productComponent';
import './productsCss.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const searchProducts = "http://localhost:4000/products";

export default function ProductsWithSearch() {
    const [prodArray, setProdArray] = useState([]); // first array
    const [filteretAfterSearch, setFilteretAfterSearch] = useState([]); // new filtered array
    const [valueSearch, setValueSearch] = useState(""); // start with empty value in the input
    const [loadingProducts, setLoadingProducts] = useState(true)

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
        finally {
            setLoadingProducts(false)
        }
    }
    useEffect(() => {
        getProductsWithSearch()
    }, [])

    function searchProduct() {
        let arrayBySearch = prodArray.filter(a => a.title.toLowerCase().includes(valueSearch.toLowerCase()))
        console.log(arrayBySearch);
        setFilteretAfterSearch(arrayBySearch)
    }

    return (
        <div className="allProductsDiv">
            <h1>All products</h1>
            {loadingProducts ? <Spinner animation="border" /> :
                <div>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search product"
                            value={valueSearch} onChange={(e) => setValueSearch(e.target.value)}
                            aria-label="Search product"
                            aria-describedby="basic-addon2"
                        />
                        <Button onClick={searchProduct} variant="outline-secondary" id="button-addon2">
                        Search
                        </Button>
                    </InputGroup>
                    <div id="allCards">
                        {filteretAfterSearch.map((oneProduct) => {
                            return (
                                <ProductComponent key={oneProduct._id} element={oneProduct}></ProductComponent>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}