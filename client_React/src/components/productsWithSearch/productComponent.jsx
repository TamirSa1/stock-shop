export default function productComponent(props) {

    return (
        <div>
            <h4>{props.element.title}</h4>
            <h4>{props.element.brand}</h4>
            <h4>{props.element.category}</h4>
            <h4>{props.element.description}</h4>
            <h4>{props.element.price}</h4>
            <h4>{props.element.rating}</h4>
            <h4>{props.element.stock}</h4>
            <img src={props.element.images[0]} alt={props.element.title}/>
        </div>
    )
}