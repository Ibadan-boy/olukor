import { addDoc, collection } from "firebase/firestore";
import Button from "../UI/Button";
import { database } from "../../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";

const StdBiodata = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleStudentSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const allData = Object.fromEntries(formData.entries());

    if (allData.firstName === "" || allData.lastName === "") {
      alert("Add a student name");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("User not signed in");
      return;
    }

    try {
      setIsLoading(true);
      await addDoc(collection(database, "students"), {
        ...allData,
        userId: currentUser.uid, // ✅ ADD THIS
        createdAt: new Date(),
      });
      navigate("/dashboard/students");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <p className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        Adding student...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-4">
      <form
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
        onSubmit={handleStudentSubmit}
      >
        <button
          type="button"
          onClick={() => navigate("/dashboard/students")}
          className="bg-blue-600 px-4 py-2 hover:bg-blue-800 cursor-pointer rounded"
        >
          Go Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-slate-400">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-2 rounded bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-slate-400">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-2 rounded bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Student ID</label>
          <input
            type="text"
            name="studentId"
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Gender</label>
          <input
            type="text"
            name="gender"
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">About Student</label>
          <textarea
            rows="5"
            name="about-student"
            required
            className="w-full px-4 py-2 rounded bg-gray-700"
          ></textarea>
        </div>

        <div>
          <Button color={"bg-blue-600 hover:bg-blue-800"}>Add Student</Button>
        </div>
      </form>
    </div>
  );
};

export default StdBiodata;
