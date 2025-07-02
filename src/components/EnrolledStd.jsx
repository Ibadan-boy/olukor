import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../services/firebase";
import NoStudent from "./NoStudent";
import { Link } from "react-router-dom";

const EnrolledStd = ({ students }) => {
    const [ fetchedStudents, setFetchedStudents ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(()=> {
        async function fetchStudents(){
            try{
                const snapShot = await getDocs(collection(database, "students"));
                const list = snapShot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFetchedStudents(list);
            } catch(err){
                console.error(err);
            } finally{
                setIsLoading(false);
            }
        }

        fetchStudents();
    }, []);

    if (isLoading) return <p className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">Loading students...</p>;

    if (fetchedStudents.length === 0) {
    return <NoStudent/>;
  }

    return(

        <>
            <div>
                <div /* className="p-4 rounded-xl bg-slate-700 border border-slate-600 shadow-sm hover:shadow-md mt-2 transition-all duration-200 space-y-2" */>
                <ul className="list-none space-y-1">
                    {fetchedStudents.map((student) => (
                    <li key={student.id} className="hover:bg-slate-600 rounded-lg">
                        <button className="w-full text-3xl text-left px-3 py-2 rounded-md hover:bg-gray-50 focus:outline-none  font-medium transition-colors bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {student.firstName} {student.lastName}
                        </button>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            

            <Link to='/dashboard/addstudent'><button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow mt-4 transition cursor-pointer">Add Student</button></Link>
        </>
        
    )
}

export default EnrolledStd;