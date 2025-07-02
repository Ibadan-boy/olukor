import Button from "./UI/Button";
import themeImg from '../assets/dark-mode.svg';
import { useDarkMode } from "./ThemeChanger";
import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";


const HeaderOne = () => {
  const { darkTheme, setDarkTheme } = useDarkMode(); 

  

  return (
    <>
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto p-5 sticky top-0 z-40">
        <div className="flex items-center gap-1">
          <Link to= '/'><img src='/chalk.png' alt="logo" className="h-10 w-10 sm:h-15 sm:w-15" /></Link>
          <Link to='/'><h2 className="text-3xl sm:text-5xl pl-4 cursor-pointer bg-gradient-to-r from-slate-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Olùkọ́
          </h2></Link>
        </div>

        <ul className="flex gap-4 text-lg sm:text-2xl items-center justify-end">
          <li>
            <img
              className="h-10 cursor-pointer"
              src={themeImg}
              alt="theme changer"
              onClick={() => setDarkTheme(!darkTheme)}
            />
          </li>
          <li>
            <Link to="/aboutpage" className="hover:underline hover:underline-offset-8 hover:decoration-slate-300 text-slate-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/errorpage" className="hover:underline hover:underline-offset-8 hover:decoration-slate-300 text-cyan-400">
              Help
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button color="bg-slate-200 active:bg-slate-300 text-sky-900">Log In</Button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <Button color="bg-slate-400 active:bg-slate-500 text-sky-900">Sign Up</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderOne;
