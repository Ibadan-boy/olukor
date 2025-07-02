import { createContext, useState, useContext, useEffect } from "react";

const ThemeToggle = createContext()

export const ThemeChanger = ({ children }) => {

    const [ darkTheme, setDarkTheme ] = useState(()=> {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(()=>{
        if(darkTheme){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkTheme])

    return(
        <ThemeToggle.Provider value={ { darkTheme, setDarkTheme } }>
            {children}
        </ThemeToggle.Provider>
    )
}

export const useDarkMode = () => {
    return useContext(ThemeToggle);
}; 
