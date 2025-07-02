import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import HeaderOne from "./HeaderOne";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import DashHeader from "./DashHeader";

const MainLayout = () => {
    const [ user, setUser ] = useState(null);
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser);   
        });
    //console.log('from main layout',user)
        return()=> unSubscribe();
    }, [user])

    return(
        <>
            {user ? <DashHeader/> : <HeaderOne />}
            <Outlet/>
            <Footer/>
        </>
    )
}

export default MainLayout;