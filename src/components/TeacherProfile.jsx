import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, database } from "../services/firebase";

export default function TeacherProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    } else {
      console.log("No user signed in");
    }

    setLoading(false); // <-- Always set loading to false
  });

  return () => unsubscribe();
}, []);


  console.log(userData);

  if (loading) {
    return (
      <div className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        Loading profile...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-slate-800 min-h-screen flex items-center justify-center text-white text-xl">
        User not found or not signed in.
      </div>
    );
  }

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-700 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
        <div className="text-center border-b border-slate-600 pb-4">
          <h2 className="text-3xl font-bold tracking-wide">
            {userData.firstName} {userData.lastName}
          </h2>
          <h2 className="text-xl text-slate-300 tracking-wide font-medium">
            {userData.email}
          </h2>
        </div>

        <div className="text-center">
          <h2 className="text-lg text-slate-400 font-medium">
            Role:{" "}
            <span className="text-white font-semibold">
              {userData.role}
            </span>
          </h2>
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-lg font-semibold tracking-wide">
            Name of School:{" "}
            <span className="text-slate-200">{userData.schoolName}</span>
          </h1>
          <h2 className="text-sm text-slate-400 italic">
            Department of Science and Technology {/* Optional */}
          </h2>
        </div>

        <div className="text-center">
          <h2 className="text-base text-slate-300">
            Subject:{" "}
            <span className="text-white font-semibold">
              {userData.subject}
            </span>
          </h2>
        </div>

        <div className="text-center">
          <button className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-medium shadow-md tracking-wide">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
