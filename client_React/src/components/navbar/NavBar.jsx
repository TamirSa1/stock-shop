import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { newCartArray } from "../../slices/cart.js";
import axios from "axios"

function NavBar() {
    const cartArray = useSelector((state) => state.cartStore.cartArray)
    const [cartItems, setCartItems] = useState(0)
    const dispatch = useDispatch(); //שורה קבועה ביכולת להשתמש בפונקציות

    async function getCartArray() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            try {
                const result = await axios.post("http://localhost:4000/cart/getCart", {
                    userId: user._id
                })
                console.log(result.data);
                if (Array.isArray(result.data)) {
                    // setCartArray(result.data)
                    dispatch(newCartArray(result.data)); // dispatch + (function name ( === action payload in cart.js file))
                }
            } catch (error) {
                console.log("error");
            }
        }
    }
    useEffect(() => {
        getCartArray()
    }, [])

    useEffect(() => {
        let quantityNumber = 0;
        for (let index = 0; index < cartArray.length; index++) {
            const element = cartArray[index];
            quantityNumber += element.quantity
        }
        setCartItems(quantityNumber)
    }, [cartArray])

    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/products">Online Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/signUp">SignUp</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        {/* <Nav.Link href="/allProducts">All Products</Nav.Link> */}
                        <Nav.Link href="/products">Products</Nav.Link>
                    </Nav>
                    <Nav.Link style={{ color: "white" }} href="/cart">Cart  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                        <span>{cartItems}</span>
                    </Nav.Link>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;