import axios from "axios"
import { useEffect, useState } from "react";
import "./cart.css"
import { useSelector, useDispatch } from 'react-redux';
import { increaseItemCount, lowerItemCount, removeCloseSpan } from "../../slices/cart.js";

const shippingPrice = 5;

export default function Cart() {
    // const [cartArray, setCartArray] = useState([])
    const cartArray = useSelector((state) => state.cartStore.cartArray) // שם משתנה חדש כמו שאני רוצה עדיף כמו בסטייט קיים אם יש
    // אחרי הסטייט נקודה להביא את שם המשתנה מהסטור ולאחר מכן את שם המשתנה מהקובץ של הסלייס
    const [cartItems, setCartItems] = useState(0)
    const [calculatePrice, setCalculatePrice] = useState(0)
    const [cupon, setCupon] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        let quantityNumber = 0;
        let priceNumber = 0;
        console.log(cartArray)
        for (let index = 0; index < cartArray.length; index++) {
            const element = cartArray[index];
            quantityNumber += element.quantity
            priceNumber += element.productData[0].price * element.quantity
        }
        setCartItems(quantityNumber)
        if (priceNumber == 0) setCalculatePrice(0)
        if (priceNumber > 0) setCalculatePrice(priceNumber + shippingPrice)
    }, [cartArray])

    async function removeSpan(element) {
        try {
            const result = await axios.delete(`http://localhost:4000/cart/${element._id}`);
            console.log(result.data);
            dispatch(removeCloseSpan(element))
        } catch (error) {
            console.log(error);
        }
    }

    async function increaseItem(element) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(element)
        try {
            const result = await axios.post("http://localhost:4000/cart", {
                userId: user._id,
                productId: element.productId
            });
            console.log(result.data);
            dispatch(increaseItemCount(element));
        } catch (error) {
            console.log(error);
        }
    }

    async function declineCart(element) {
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const result = await axios.put("http://localhost:4000/cart", {
                userId: user._id,
                productId: element.productId
            });
            console.log(result.data);
            dispatch(lowerItemCount(element))
        } catch (error) {
            console.log(error);
        }
    }

    async function lowerItem(element) {
        if (element.quantity === 0) {
            removeSpan(element)
        } else {
            declineCart(element)
        }
    }

    return (
        <div className="card1">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">Items in cart - {cartItems}</div>
                        </div>
                    </div>
                    {cartArray.map((cart) => {
                        return (
                            <div className="row border-top border-bottom" key={cart._id}>
                                <div className="row main align-items-center">
                                    <div className="col-2"><img className="img-fluid" src={cart.productData[0].images[0]} alt="clothImg" /></div>
                                    <div className="col">
                                        <div className="row">{cart.productData[0].title}</div>
                                    </div>
                                    <div className="col quantity">

                                        <ul className="ul">
                                            <li onClick={() => increaseItem(cart)} className="qty-opt left" role="button">
                                                +
                                            </li>
                                            <li className="middle">
                                                <input className="inputQuantity" type="number" value={cart.quantity} />
                                            </li>
                                            <li onClick={() => lowerItem(cart)} role="button" className="qty-opt right">
                                                -
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col" style={{ marginTop: "10px" }}>{cart.productData[0].price * cart.quantity} $
                                    </div>
                                    <span onClick={() => removeSpan(cart)} // (cart) = element from removeSpan() function (the element i want to remove)
                                        className="close">&#10005;</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr />
                    {/* <div className="row"> */}
                    {/* <div className="col" style={{ paddingeft: 0 }}>{cartItems}</div> */}
                    {/* <div className="col text-right">{calculatePrice}$</div> */}
                    {/* </div> */}
                    <form>
                        <p>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- 5.00$</option></select>
                        <p>COUPON CODE</p>
                        <input className="inputCode" id="code" placeholder="Enter your code" value={cupon} onChange={(e) => setCupon(e.target.value)} />
                    </form>
                    <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">{calculatePrice}$</div>
                    </div>
                    <button className="btn1" onClick={() => handlePay()}>PAYMENT</button>
                </div>
            </div>
        </div>
    )
}