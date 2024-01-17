import {Link} from 'react-router-dom'
export default function ProductList({id, name, price, stock, category}){

    const data = {
        id,
        name,
        price,
        stock,
        category
    }

    return (
    <div>
        <h3 >{name}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>price: {price}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>in stock: {stock}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>category: {category}</h3>
        <Link to='/product-details' state={data}>Go to Product Detail</Link>
    </div>
    
    )
}