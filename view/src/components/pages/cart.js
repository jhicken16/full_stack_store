import { useState, useEffect } from 'react'
import { getCart } from '../../services/services';
import Product from '../sub/ProductList'
import Error from '../Error'
import { checkOut } from '../../services/services';



export default function Cart(){

    const [ error, setError] = useState(null)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const fetchCart = async () => {
            try{
                const response = await getCart()
                console.log(response)
                setCart(response)
            }
            catch(err){
                setError(err)
            } 
        }
        fetchCart()
    }, [])

    return (
        <>
        { cart.map((product, index) => (
            <Product 
                key={index}
                quantity={product.quanity}
                name={product.name}
                price={product.price}
            />
        )) }
        <button onClick={checkOut}>Checkout</button>
        {error && <Error errorMessage={error} />}
        </>
        
    )
}