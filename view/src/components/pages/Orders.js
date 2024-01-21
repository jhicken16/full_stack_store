import { useState, useEffect } from 'react'

import { getOrderHistory } from '../../services/services'

export default function Orders(){

    const [orders, setOrder] = useState({})

    useEffect(() => {
        const MakeAwait = async () => {
            setOrder(await getOrderHistory())
        }
        MakeAwait()
    }, [])
    console.log(Object.entries(orders))
    return (
        <>
            <h1>Order History</h1>
            {
                Object.entries(orders).map(([orderId, orders]) => {
                    return orders.map((order, index) => {
                        if(index === 0){
                            return (
                                <>
                                    <h3>Date Ordered: {order.data_ordered}, address: {order.shipping_addres}</h3>
                                    <h4>product: {order.name}, price: {order.price}</h4>
                                </>
                            )
                        }
                        else{
                            return <h4>product: {order.name}, price: {order.price}</h4>
                        }
                    })
                  })
            }
        </>
    )
}