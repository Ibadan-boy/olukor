const Error = ({ message }) => {
    return(
        <>
            <div>
                <p className="text-red-500 bg-red-100 p-2 mt-4 rounded">{message}</p>
            </div>
        </>
    )
}

export default Error;