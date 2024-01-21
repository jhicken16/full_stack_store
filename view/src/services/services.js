async function register(name, email, password){


    try{
        const response = await fetch('http://localhost:4000/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        
        const data = await response.json()
        console.log(response)
        console.log(data)
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }

        return {
            status: response.status,
            message: data.message
        }
    }
    catch(err){
        throw err
    }
}

async function login(email, password){

    try{
        const response = await fetch('http://localhost:4000/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include'
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        console.log(response)
        return {
            status: response.status,
            message: data.message
        }

    }
    catch(err){
        throw err
    }
    
}

async function logOut(){
    try{
        const response = await fetch('http://localhost:4000/auth/logout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        console.log(response)
        if(!response.ok){
            throw new Error('Logout Failed')
        }
    }
    catch(err){
        throw err
    }
}

async function getProducts(){
    try{
        const response = await fetch('http://localhost:4000/products/none', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        const data = await response.json()
        
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        
        return data
    }
    catch(err){
        throw err
    }
}

async function addToCart(productId, quantity){
    
    try{
        const response = await fetch('http://localhost:4000/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                quantity
            }),
            credentials: 'include'
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }


    }
    catch(err){
        throw err
    }
}

async function getCart(){
    try{
        const response = await fetch('http://localhost:4000/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        return data
    }
    catch(err){
        throw err
    }
}

async function checkOut(){
    try{
        const response = await fetch('http://localhost:4000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        console.log(response)
        const data = await response.json()
        if(!response.ok){
            throw new Error(`http error! status: ${response.status}, message: ${data.message}`)
        }
        
        console.log(data)
        const { url } = data
        window.location = url
    }
    catch(err){
        console.log(err)
    }
}
export {register, login, logOut, getProducts, addToCart, getCart, checkOut} 