export default function productComponent(props) {

    return (
        <div>
            <h4>CategoryID- {props.forProps.CategoryID}</h4>
            <h4>Price- {props.forProps.Price}</h4>
            <h4>ProductID- {props.forProps.ProductID}</h4>
            <h4>ProductName- {props.forProps.ProductName}</h4>
            <h4>SupplierID- {props.forProps.SupplierID}</h4>
            <h4>Unit- {props.forProps.Unit}</h4>
        </div>
    )
}