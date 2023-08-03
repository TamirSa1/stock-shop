import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function productComponent(props) {

    async function addToCart() {
        alert("Product added to cart");
    
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const result = await axios.post("http://localhost:4000/cart",{
                userId: user._id,
                productId: props.element._id,
                quantity: 1
            })
            console.log(result.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Card style={{ width: '300px' }}>
            <Card.Img variant="top" src={props.element.images[0]} alt={props.element.title} className='imageCard' />
            <Card.Body>
                <Card.Title>{props.element.title}</Card.Title>
                <Card.Text>
                    {props.element.description}
                </Card.Text>
                <Card.Text>
                    {props.element.price}$
                </Card.Text>
                <Card.Text>
                    {props.element.rating}<span style={{ color: "orange" }} class="fa fa-star"></span>
                </Card.Text>
                <Card.Text>
                    Avilable at stock {props.element.stock} units
                </Card.Text>
            </Card.Body>
            <Button onClick={addToCart} className='cardBtn' variant="primary">Add to cart  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            </Button>
        </Card>

        // <div>
        //     <h4>{props.element.title}</h4>
        //     <h4>{props.element.brand}</h4>
        //     <h4>{props.element.category}</h4>
        //     <h4>{props.element.description}</h4>
        //     <h4>{props.element.price}</h4>
        //     <h4>{props.element.rating}</h4>
        //     <h4>{props.element.stock}</h4>
        //     <img src={props.element.images[0]} alt={props.element.title}/>
        // </div>
    )
}