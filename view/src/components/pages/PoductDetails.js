import { useLocation } from 'react-router-dom'

export default function ProductDetail(){
    const location = useLocation()
    const data = location.state
    console.log(data)

    return (
    <div>
        <h3 >{data.name}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>price: {data.price}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>in stock: {data.stock}</h3>
        <h3 style={{display:'inline', padding: '1em'}}>category: {data.category}</h3>
    </div>
    )
}