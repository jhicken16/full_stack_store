import { useState, useEffect } from 'react'
import { getProducts } from '../../services/services';
import Product from '../sub/ProductList'
import Error from '../Error'



export default function Products(){

    const [ error, setError] = useState(null)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await getProducts()
                console.log(response)
                setProducts(response)
            }
            catch(err){
                setError(err)
            } 
        }
        fetchProducts()
    }, [])

    return (
        <>
        { products.map((product, index) => (
            <Product 
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                category={product.category}
            />
        )) }
        {error && <Error errorMessage={error} />}
        </>
        
    )
}