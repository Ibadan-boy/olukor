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
    }, [])

    if (isLoading) return <p>Loading students...</p>;

    if (fetchedStudents.length === 0) {
    return <NoStudent/>;
  }

    return(
        <div className="p-6 rounded-lg bg-white shadow hover:shadow-lg hover:scale-[1.01] transition-transform duration-200 border space-y-4">
            {fetchedStudents.map((student) => {
                return(
                    <li key={student.id}>
                        <button className="text-left px-4 py-2 w-full hover:bg-gray-100 rounded">{student.name}</button>
                    </li>
                )
            })}
            <Link><button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition cursor-pointer">Add Student</button></Link>
        </div>
    )
}

export default EnrolledStd;