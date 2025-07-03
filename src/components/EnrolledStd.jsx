import { useState, useEffect } from "react";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { database } from "../services/firebase";
import NoStudent from "./NoStudent";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";


const EnrolledStd = ({ students }) => {
    const [ fetchedStudents, setFetchedStudents ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ modalIsOpen, setModalIsOpen ] = useState();
    const [ selectedStudentId, setSelectedStudentId ] = useState(null);
    const navigate = useNavigate();

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

  function handleCloseModal(){
    setModalIsOpen(false);
  }

  const handleConfirmDelete = async () => {
  try {
    await deleteDoc(doc(database, "students", selectedStudentId));
    setFetchedStudents(prev =>
      prev.filter(student => student.id !== selectedStudentId)
    );
    setModalIsOpen(false);
    setSelectedStudentId(null);
    } catch (err) {
    console.error("Error deleting student:", err);
    }
    };

    return(

        <>

            { modalIsOpen === true && <Modal open={modalIsOpen} onClose={handleCloseModal} className = "flex items-center">
                <DeleteConfirmation onCancel={handleCloseModal} onConfirm={handleConfirmDelete}/>
            </Modal>}
            <div>
                <div>
                <ul className="list-none space-y-1 grid grid-cols-3">
                    {fetchedStudents.map((student) => (
                    <li key={student.id} className="group hover:bg-slate-600 rounded-lg flex m-8">
                        <button onClick={()=> {navigate('/dashboard/studentprofile')}} className="w-full text-3xl text-left px-3 py-2 rounded-md hover:bg-gray-50 focus:outline-none bg-slate-700 font-medium transition-colors bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {student.firstName} {student.lastName}
                        </button>

                        <button className="invisible group-hover:visible bg-purple-600 px-3 py-2 rounded m-1.5 hover:bg-purple-400" onClick={()=> { setSelectedStudentId(student.id); setModalIsOpen(true) }}>Delete</button>
                    </li>
                    ))}
                    
                </ul>
                
                </div>
            </div>
            

            <Link to='/dashboard/addstudent'><button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow mt-4 transition cursor-pointer m-8">Add Student</button></Link>
        </>
        
    )
}

export default EnrolledStd;