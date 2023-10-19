import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';
import { useNavigate } from "react-router-dom";
import {addCartItem} from "../../slices/cart";
import { useDispatch } from 'react-redux';

// להסיר מוצר מהקארט, לסדר את את התמונה בסאיין אין, לעבור מהסאיין אין לפרודקטס אחרי לחיצה על הרשמה


export default function productComponent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // function moveToCart() {
    //     window.location.href = "http://localhost:5173/cart";
    // }

    // function closePopup() {
    // myWindow.close();
    // let close = document.getElementsByClassName('popup')[0].style.display = "none"; 
    // }

    async function addToCart() {

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            try {
                const result = await axios.post("/api/cart", {
                    userId: user._id,
                    productId: props.element._id,
                    quantity: 1
                })

                toast.success("Product added to cart", {
                    position: toast.POSITION.TOP_CENTER,
                })
                const object = {
                    quantity: 1,
                    productId: props.element._id,
                    userId: user._id,
                    productData: [props.element]
                }
                dispatch(addCartItem(object))
                console.log(result.data);
            }
            catch (error) {
                console.log(error);
                toast.error("cannot add to cart", {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
        }
        else{
            navigate("/login");
        }
    }

    return (
        <Card style={{ width: '300px' }}>
            <Card.Img variant="top" src={props.element.images[0]} alt={props.element.title} className='imageCard'
                onClick={() => setIsOpen(true)} />

            <Card.Body onClick={() => setIsOpen(true)}>
                <Card.Title>{props.element.title}</Card.Title>
                <Card.Text>{props.element.price}$</Card.Text>
                <Card.Text>
                    {props.element.rating}<span style={{ color: "orange" }} className="fa fa-star"></span>
                </Card.Text>
            </Card.Body>
            <Button onClick={addToCart} className='cardBtn' variant="primary">Add to cart  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            </Button>
            <ToastContainer autoClose={2000} />

            {/* פה מתחיל הפופ אפ */}
            <ReactModal
                isOpen={isOpen}
                contentLabel="Example Modal"
                className="popup"
                onRequestClose={() => setIsOpen(false)}>
                <div>
                    <Card.Img variant="top" src={props.element.images[0]} alt={props.element.title} className='imageCard' />
                </div>
                <div className='cardBodyPopUpDiv'>
                    <Card.Body>
                        <Card.Title>{props.element.brand}</Card.Title>
                        <Card.Title>{props.element.category}</Card.Title>
                        <Card.Title>{props.element.title}</Card.Title>
                        <Card.Text>{props.element.description}</Card.Text>
                        <Card.Text>{props.element.price}$</Card.Text>
                        <Card.Text>{props.element.discountPercentage}% discount</Card.Text>
                        <Card.Text>
                            {props.element.rating}<span style={{ color: "orange" }} className="fa fa-star"></span>
                        </Card.Text>
                        <Card.Text>Avilable at stock {props.element.stock} units</Card.Text>
                        <Button onClick={() => addToCart()} className='addToCartPopupBtn' variant="outline-danger">Add to cart</Button>
                    </Card.Body>
                    <svg onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                {/* <Button onClick={() => setIsOpen(false)} className='closePopupBtn' variant="outline-danger">Close</Button> */}
            </ReactModal>
        </Card>
    )
}