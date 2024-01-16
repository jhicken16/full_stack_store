import { useState } from 'react';
import {register, login} from '../../services/services';
import Error from '../Error';

export default function Home(){
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ error, setError] = useState(null)
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        //pass states to fetch request.
        try{
            const response = await register(name, email, password)
            if(response.status === 200){
                const userLoggedIn = await login(email, password)
                console.log(document.cookie)
            }
        }
        catch(err){
            //This is where I will need to redirect the page to the error page.
            console.log(err)
            setError(err)
        }  
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Register" />
            </form>
            {error && <Error errorMessage={error} />}
        </>
    )
}