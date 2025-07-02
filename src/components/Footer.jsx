import Button from "./UI/Button";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <footer className="bg-slate-900">
            <div className=" grid grid-cols-3  gap-2 justify-center">
             <div className="text-slate-200 ml-6 mt-10">
                <h2 className="text-2xl mb-4">Quick Links</h2>
                <ul>
                    <li className="hover:text-purple-500"><Link to = '/'>Home</Link></li>
                    <li className="hover:text-purple-500"><Link to='Aboutpage'>About Us</Link></li>
                    <li className="hover:text-purple-500"><Link to = 'errorpage'>Help</Link></li>
                    <li className="hover:text-purple-500"><Link to = 'signup'>Sign Up</Link></li>
                    <li className="hover:text-purple-500"><Link to= 'login'>Log In</Link></li>
                </ul>
             </div>

             <div className="text-slate-200 mt-10">
                <h2 className="text-2xl mb-4">Socials</h2>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>LinkedIn</li>
                </ul>
             </div>

             <div className="text-slate-200 mt-10">
                <h2 className="text-2xl mb-4">Sign Up For Our Newsletter!</h2>
                <input type="email" className="bg-slate-800"/>
                <Button color={'bg-slate-700 ml-3'}>Submit!</Button>
             </div>
            </div>
            
            <p className="text-xl text-slate-400 flex justify-center">&copy; {new Date().getFullYear()} Olukor. All Rights Reserved</p>
        </footer>
    )
}

export default Footer;