import { useDarkMode } from "./ThemeChanger";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

const ErrorPage = () => {
    const { darkTheme, setDarkTheme } = useDarkMode()

    return (

        <>
            <main className={`min-h-screen flex items-center justify-center ${ darkTheme ? 'bg-slate-800' : 'bg-gray-300-200'} px-4`}>
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-red-600 mb-4">Error 404</h1>
                    <p className={`text-lg ${ darkTheme ? 'text-gray-200' : 'text-gray-600'} mb-2`}>
                        The page you requested for could not be found
                    </p>
                    <p className="text-md text-gray-500">
                        Please, check again and confirm the URL
                    </p>

                    <p><Link to='/'><button className={`m-8 cursor-pointer bg-slate-600 ${ darkTheme ? 'text-slate-200' : 'text-slate-200' } rounded-3xl hover:bg-slate-700 px-3 py-2`}>Go To Home</button></Link></p>
                </div>
                

            </main>

            
        </>
        
    );
};

export default ErrorPage;
