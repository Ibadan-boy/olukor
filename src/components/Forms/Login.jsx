import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useDarkMode } from "../ThemeChanger";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import { useState } from "react";


function Login(){
  const { darkTheme } = useDarkMode();
  const navigate = useNavigate();
  const [ error, setError ] = useState();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isLoading, setIsLoading ] = useState();



  async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target.form);
    const allData = Object.fromEntries(formData.entries());

    setIsLoading(true);

    try{
       await signInWithEmailAndPassword(auth, allData.email, allData.password);
      
      navigate("/dashboard");

      } catch (err) {
      
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Check your internet connection.");
          break;
        default:
          setError("Login failed. Please try again.");

      }

      setIsLoading(false);
  }}

  if(isLoading){
    return(
      <div className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        Loading Dashboard...
      </div>
    )
  }

  

  
  
  return (

      <div className={`min-h-screen flex items-center justify-center ${ darkTheme ? 'text-white' : 'text-gray-500'} px-4` }>
        

      <form className={` p-8 rounded-lg shadow-lg ${ darkTheme ? 'bg-gray-800' : 'bg-off-white shadow-md' } w-full max-w-md space-y-6`}>
        { error && <Error message={error}/> }
        <h1 className={`text-4xl font-semibold ${ darkTheme ? 'text-gray-200' : 'text-gray-800' } text-center `}>Log in to Olukor</h1>

        <div>
          <label className="block text-lg mb-2 text-slate-400">Email</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded ${ darkTheme ? 'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="you@example.com"
            name="email"
            required
          />
        </div>

        <div>
          <div>
            <label className="block text-lg mb-2 text-slate-400">Password</label>
            <input
              type= { showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 rounded ${ darkTheme ? 'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              name="password"
              required
            />

            <label className="flex gap-2 mt-3">
              <input type="checkbox"
              checked={showPassword}
              onChange={()=> setShowPassword (prev => !prev)}
              className="accent-blue-500 cursor-pointer"  />
              <span className="text-sm text-slate-400">Show Password</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <Button color={'bg-blue-600'} onClick={handleSubmit}>Log In</Button>
          <a  href="#">Forgot Password?</a>
          
        </div>

        
        
        <p><Link to='/signup'>Don't have an account?</Link></p>

        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200 transition cursor-pointer">
            Continue with Google
          </button>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition cursor-pointer">
            Continue with Email
          </button>
        </div>
        
      </form>
      
      </div>
    
  );
}

export default Login;
