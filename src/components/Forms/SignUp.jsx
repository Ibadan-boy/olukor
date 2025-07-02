import { Link } from "react-router-dom";
import { ThemeChanger, useDarkMode } from "../ThemeChanger";
import Button from "../UI/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { database } from "../../services/firebase";
import { useState } from "react";
import { auth } from "../../services/firebase";
import Error from "../Error";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [ passwordIsValid, setPasswordIsValid ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
  const [ error, setError ] = useState(null)
  const { darkTheme } = useDarkMode();

  const createdUser = async ( auth, email, password ) =>{
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function handleSubmit(event) {
  event.preventDefault();

  const fd = new FormData(event.target); // fixed
  const data = Object.fromEntries(fd.entries());

  if (data.password !== data.confirmPassword) {
    setPasswordIsValid(false);
    return;
  }

  if (!event.target.terms.checked) {
    setError("You must accept the terms and conditions.");
    return;
  }

  setPasswordIsValid(false); 
  const email = data.email;
  const password = data.password;


  try {

    const userDetails = await createdUser(auth, email, password)
    console.log(userDetails); 

    await setDoc(doc(database, "users", userDetails.user.uid), {
      firstName: data.firstName,
      lastName: data.lastName,
      schoolName: data.schoolName,
      role: data.role,
      subject: data.subject,
      email: email,
      createdAt: new Date(),
    });

    console.log("Creating Firestore document for:", userDetails.user.uid);

    navigate("/dashboard");
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      setError("This email is already registered.");
    } else if (err.code === "auth/weak-password") {
      setError("Password must be at least 6 characters.");
    } else {
      setError("Sign-up failed. Please, try again.");
    }
  }
}



  return (
    <ThemeChanger>
      <div className={`min-h-screen flex items-center justify-center ${ darkTheme ? 'text-white' : 'text-gray-500'} px-4`}>
      <form className={`w-full max-w-lg ${darkTheme ? 'bg-gray-800' : 'bg-off-white shadow-md'} p-8 rounded-lg shadow-lg space-y-6`} onSubmit={handleSubmit}>
        <h2 className={`text-3xl font-bold text-center ${ darkTheme ? 'text-gray-200' : 'text-gray-600' } mb-6`}>Sign in to Olukor</h2>

        { error && <Error message={error}/> }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-slate-400">First Name</label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700'  : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="First Name"
              name="firstName"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-400">Last Name</label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Last Name"
              name="lastName"
              required
              minLength={3}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Email</label>
          <input
            type="email"
            className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="you@example.com"
            name="email"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-slate-400">Password</label>
            <input
              type={ showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

          <div>
            <label className="block mb-2 text-slate-400">Confirm Password</label>
            <input
              type={ showConfirmPassword ? "text" : "password"}
              className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              name="confirmPassword"
              required
            />
            <label className="flex gap-2 mt-3">
              <input type="checkbox"
              checked={showConfirmPassword}
              onChange={()=> setShowConfirmPassword (prev => !prev)}
              className="accent-blue-500 cursor-pointer"  />
              <span className="text-sm text-slate-400">Show Password</span>
            </label>
          </div>

          { !passwordIsValid && (<p className="text-red-600 col-span-2">Check password and try again</p>) }
        </div>

        <div>
          <label className="block mb-2 text-slate-400">School Name</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Your School"
            name="schoolName"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Subject Taught</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g. Physics"
            name="subject"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Role</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded ${ darkTheme ?  'bg-gray-700' : 'bg-gray-200'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Teacher or Instructor"
            name="role"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="terms" className="accent-blue-500 cursor-pointer" required/>
          <label htmlFor="terms" className="text-sm text-slate-400">
            I accept the terms and conditions
          </label>

          <p><Link to='/login'>Already have an account?</Link></p>
        </div>



        <div className="flex justify-center"><Button type = 'submit' color={'bg-blue-500 hover:bg-blue-700'}>Create Account</Button></div>
        
      </form>

      </div>
    </ThemeChanger>
  );
};

export default SignUp;