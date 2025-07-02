import { useState, useEffect } from "react"
import { myPictures } from "../util/data";

let theImages = myPictures;

const Carousel = () =>{
    const [imageIndex, setImageIndex] = useState(0);
    const [ fade, setFade ] = useState(false);

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setFade(true);
            setTimeout(()=> {
                setImageIndex((prevIndex)=> (prevIndex + 1)% theImages.length);
                setFade(false)
            }, 500)
            }, 4000)
            

        return ()=> clearInterval(intervalId);
    }, [])

    return(
        <div className={`w-full flex justify-center items-center py-4`}>
            <img  className={`w-full max-w-5xl h-[800px] object-cover mx-auto rounded-3xl transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`} src= {theImages[imageIndex]} alt="header image" width= '1000'/>
        </div>
    )
}

export default Carousel;