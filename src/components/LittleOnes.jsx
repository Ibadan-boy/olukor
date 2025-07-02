import { Link } from "react-router-dom";
import Button from "./UI/Button";

const LittleOnes = ({ title, description, cta, border }) => {
    return(
        <div className={`w-80 m-5 border-2 p-8 rounded-lg ${border} mb-20`}>
            <h2 className="text-2xl mb-1.5">{title}</h2>
            <p className="text-wrap mb-2">{description}</p>
            <Link to= '/login'><Button className='m-auto' color={'bg-slate-500'}>{cta}</Button></Link>
        </div>
    )
}

export default LittleOnes;