export default function Error({ errorMessage }){

    console.log(errorMessage)
    return (
        <>
        <h1>Error</h1>
        <h3>{errorMessage.message}</h3>
        </>
    )
}