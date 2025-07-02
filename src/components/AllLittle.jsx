import LittleOnes from "./LittleOnes"
import coreValues from "../util/data";
import About from "./About";
import { useDarkMode } from "./ThemeChanger";

const AllLittle = () => {

  

    const design = "grid grid-cols-2 gap-0 w-2xl m-auto";

    return(
        <>
          <About/>
          <div className={design}>{coreValues.map((corevalues) => (<LittleOnes key={corevalues.title} {...corevalues} border= 'bg-slate-600'/>))}</div>
          <div className="h-1 w-full mt-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </>
        
    )
}

export default AllLittle;