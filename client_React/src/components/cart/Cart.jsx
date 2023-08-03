import axios from "axios"
import { useEffect, useState } from "react";
import "./cart.css"
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

const shippingPrice = 5;

export default function Cart() {
    const [cartArray, setCartArray] = useState([])
    const [cartItems, setCartItems] = useState(0)
    const [calculatePrice, setCalculatePrice] = useState(0)

    async function getCartArray() {
        const user = JSON.parse(localStorage.getItem('user'));
        const result = await axios.post("http://localhost:4000/cart/getCart", {
            userId: user._id
        })
        console.log(result.data);
        if (Array.isArray(result.data)) {
            setCartArray(result.data)
        }

    }
    useEffect(() => {
        getCartArray()
    }, [])

    useEffect(() => {
        let quantityNumber = 0;
        let priceNumber = 0;
        for (let index = 0; index < cartArray.length; index++) {
            const element = cartArray[index];
            quantityNumber += element.quantity
            priceNumber += element.productData[0].price
        }
        setCartItems(quantityNumber)
        if(priceNumber > 0) setCalculatePrice(priceNumber+shippingPrice)
    }, [cartArray])

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
                                        {/* <div className="row text-muted">{item.cloth.sector}</div> */}
                                        <div className="row">{cart.productData[0].title}</div>
                                    </div>
                                    <div className="col quantity">

                                        <ul className="ul">
                                            <li className="qty-opt left disabled">
                                                {/* <AddIcon ></AddIcon> */}
                                                +
                                            </li>
                                            <li className="middle">
                                                <input className="inputQuantity" type="number" value={cart.quantity} />
                                            </li>
                                            <li role="button" className="qty-opt right">
                                                {/* <RemoveIcon ></RemoveIcon> */}
                                                -
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col" style={{ marginTop: "10px" }}>{cart.productData[0].price} $
                                        {/* <h6>size: {item.size}</h6> */}
                                    </div>
                                    <span className="close">&#10005;</span>
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
                        <p>GIVE CODE</p>
                        <input className="inputCode" id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">{calculatePrice}$</div>
                    </div>
                    <button className="btn" onClick={() => handlePay()}>PAYMENT</button>
                </div>
            </div>
        </div>
    )
}