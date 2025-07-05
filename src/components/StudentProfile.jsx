import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const StudentProfile = () => {
    const navigate = useNavigate();
    const [ currentStudent, setCurrentStudent ] = useState([])
    const { id } = useParams()

    // useEffect(()=> {
    //     async function fetchStudents(){
    //         try{
    //             const snapShot = await getDocs(collection(database, "students"));
    //             const list = snapShot.docs.map( doc => ({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }));
    //             setFetchedStudents(list);
    //             console.log(fetchedStudents)
    //         } catch(err){
    //             console.error(err);
    //             } finally{
    //             //setIsLoading(false);
    //             }
    //     }

    //     fetchStudents();
    // }, []);

    useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(database, "students", id);
        const docSnap = await getDoc(docRef);
        console.log(id)
        console.log(docSnap);

        if (docSnap.exists()) {
          setCurrentStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Student not found.");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

    return(
        <>
            <div className="max-w-xl mx-auto bg-slate-700 shadow-lg rounded-lg p-6 text-white">
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold">
        {currentStudent.firstName} {currentStudent.lastName}
      </h1>
      <p className="mt-2 text-xl text-slate-300">{currentStudent.gender}</p>
    </div>

    <div>
      <h2 className="text-xl font-semibold text-slate-200">
        Date of Birth: {currentStudent.dateOfBirth}
      </h2>
      <p className="mt-2 text-slate-300">{currentStudent["about-student"]}</p>
    </div>
  </div>

  <button
    onClick={() => navigate(-1)}
    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
  >
    Go back
  </button>
</div>

        </>
    )
}

export default StudentProfile;