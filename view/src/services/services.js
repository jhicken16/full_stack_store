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

export default register 