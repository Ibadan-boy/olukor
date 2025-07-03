// pages/StudentProfile.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../services/firebase";

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      if (!id) {
        console.warn("No student ID in URL.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(database, "students", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          console.log("Student not found.");
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        Student not found.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-700 text-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {student.firstName} {student.lastName}
        </h2>

        <p className="text-sm text-slate-400 text-center">
          Student ID: <span className="text-white">{student.studentId}</span>
        </p>

        <div className="space-y-1">
          <p>Gender: <span className="text-white">{student.gender}</span></p>
          <p>Date of Birth: <span className="text-white">{student.dateOfBirth}</span></p>
          <p>About: <span className="text-white">{student["about-student"]}</span></p>
        </div>
      </div>
    </div>
  );
}
