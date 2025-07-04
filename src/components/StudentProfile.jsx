import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import NoStudent from "./NoStudent";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../services/firebase";

const StudentProfile = ({ students }) => {
    const [fetchedStudents, setFetchedStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchStudents() {
            try {
                const snapShot = await getDocs(collection(database, "students"));
                const list = snapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFetchedStudents(list);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStudents();
    }, []);

    if (isLoading) return <p className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">Loading student's profile...</p>;

    if (fetchedStudents.length === 0) {
        return <NoStudent />;
    }

    // Get specific student from fetched data or use prop
    const currentStudent = students || fetchedStudents.find(student => student.id === params.id) || fetchedStudents[0];

    // Add safety check
    if (!currentStudent) {
        return <div>Student not found</div>;
    }

    return (
        <>
            <div>
                <div className="bg-slate-700 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6 items-center justify-center">
                    <div className="text-center border-b border-slate-600 pb-4">
                        <h2 className="text-3xl font-bold tracking-wide">
                            {currentStudent.firstName} {currentStudent.lastName}
                        </h2>
                        <h2 className="text-xl text-slate-300 tracking-wide font-medium">
                            {currentStudent.gender}
                        </h2>
                    </div>

                    <div className="text-center">
                        <h2 className="text-lg text-slate-400 font-medium">
                            Date of Birth:{" "}
                            <span className="text-white font-semibold">
                                {currentStudent.dateOfBirth}
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
            
            <Link to='/dashboard/students'>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow mt-4 transition cursor-pointer m-8">
                    Go Back
                </button>
            </Link>
        </>
    );
};

export default StudentProfile;