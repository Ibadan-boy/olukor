const Button = ({ children, color, onClick }) => {
    return(
        <button onClick={onClick} className={`${color} px-4 py-2 text-lg cursor-pointer rounded-md hover:opacity-90 transition duration-300`}>{children}</button>
    )
}

export default Button;