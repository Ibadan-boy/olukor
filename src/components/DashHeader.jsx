import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const DashHeader = () => {

  const navigate = useNavigate();

  async function handleLogOut(){
    try{
      await signOut(auth);
      console.log('User logged out');
      navigate('/login');
    } catch(error){
      console.log('Error logging out')
    }
  }

    return(
    <nav className="flex justify-between mt-4">
        <div className="flex items-center gap-1">
          <img src='/chalk.png' alt="logo" className="h-10 w-10 sm:h-15 sm:w-15" />
          <h2 className="text-3xl sm:text-5xl pl-4 cursor-pointer bg-gradient-to-r from-slate-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Olùkọ́
          </h2>
        </div>
        <ul>
            <li><button className="rounded-lg
             px-3
            py-2
            bg-purple-500
            hover:bg-purple-700
            cursor-pointer"
            onClick={handleLogOut}>Log Out</button></li>
        </ul>
    </nav>
    )
    
}

export default DashHeader;