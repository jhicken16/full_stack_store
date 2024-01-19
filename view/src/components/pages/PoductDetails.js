import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { addToCart } from '../../services/services'
import Error from '../Error'


export default function ProductDetail(){
    const location = useLocation()

    const [data] = useState(location.state)

    const [quantity, setQuantity] = useState(1)

    const [ error, setError] = useState(null)

    const [ordered, setOrder] = useState(null)

    useEffect(() => {
        setError(null)
    }, [ordered])

    return (
        <>
        <div>
            <h3 >{data.name}</h3>
            <h3 style={{display:'inline', padding: '1em'}}>price: {data.price}</h3>
            <h3 style={{display:'inline', padding: '1em'}}>in stock: {data.stock}</h3>
            <h3 style={{display:'inline', padding: '1em'}}>category: {data.category}</h3>
            <form onSubmit={ async (event) => {
                event.preventDefault()
                try{
                    await addToCart(data.id, quantity)
                    setOrder(`You have Ordered ${data.name}`)
                }catch(err){
                    console.log('catch triggered')
                    setError(err)
                }
                
                }}>
                <label>
                    Quantity:
                    <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
        {error && <Error errorMessage={error} />}
        {ordered && <h2>{ordered}</h2>}
        </>
    
    )
}