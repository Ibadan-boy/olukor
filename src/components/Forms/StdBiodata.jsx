import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Button from "../UI/Button";
import { database } from "../../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StdBiodata = () => {
  const [ isLoading, setIsLoading ] = useState();
  const navigate = useNavigate();
  
  const generalClasses = ["min-h-screen flex items-center justify-center bg-gray-800 text-white px-4",
     "w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg space-y-6",
      "flex flex-col items-center space-y-4",
       "w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-slate-500 shadow-md",
        "cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition text-sm", 
      "grid grid-cols-1 md:grid-cols-2 gap-4", 
    "block mb-2 text-slate-400", 
  "block mb-2 text-slate-400",
  "w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"]

  async function handleStudentSubmit(event){
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const allData = Object.fromEntries(formData.entries());
  
    if(allData.firstName === "" || allData.lastName === ""){
      alert("Add a student name");
      return;
    }
    const studentId = allData.studentId;
    const q = query(collection(database, "students"), where("studentId", "==", studentId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Student ID already exists. Please use a unique ID.");
      return;
    }


    try{
      setIsLoading(true);
      await addDoc(collection(database, "students"), {
        ...allData,
        createdAt: new Date()
      })
    } catch(err){
      console.log(err)
    } finally{
      setIsLoading(false);
      navigate('/dashboard/students')
    }
  }

  if (isLoading) return <p className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">Adding student...</p>;

  return (
    
    <div className= {generalClasses[0]}>
    
      <form className={generalClasses[1]} onSubmit={handleStudentSubmit}>

        <button type="button" className="bg-blue-600 px-4 py-2 hover:bg-blue-800 cursor-pointer rounded" onClick={()=> {navigate('/dashboard/students')}}>Go Back</button>

        <div className={generalClasses[5]}>
          <div>
            <label className={generalClasses[6]}>First Name</label>
            <input
              type="text"
              className={generalClasses[8]}
              name="firstName"
              required
            />
          </div>

          <div>
            <label className={generalClasses[7]}>Last Name</label>
            <input
              type="text"
              className={generalClasses[8]}
              name="lastName"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Student ID</label>
          <input
            type="text"
            className={generalClasses[8]}
            name="studentId"
            required
          />
        </div>

        <div>
          <label className="m-2">
            <input type="text" name="gender" placeholder="Gender" className = {generalClasses[8]} required/>
          </label>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Date Of Birth</label>
          <input
            type="date"
            className={generalClasses[8]}
            name="dateOfBirth"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">General Notes</label>
          <textarea
            rows="6"
            className={generalClasses[8]}
            placeholder="Enter any relevant notes here..."
            name="about-student"
            required
          ></textarea>
        </div>

        <div>
            <Button color={'bg-blue-600 hover:bg-blue-800'}>Add Student</Button>
        </div>
      </form>
    </div>
  );
};

export default StdBiodata;
