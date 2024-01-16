import { useState } from 'react';


export default function Home(){
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()

        //pass states to fetch request.

        console.log(name, email, password)
    }


    return (
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
    )
}