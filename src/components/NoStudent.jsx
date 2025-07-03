import { Link } from "react-router-dom";

const NoStudent = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-20 space-y-4">
      <h2 className="text-5xl font-semibold text-gray-600">No Students Found</h2>
      <p className="text-gray-600">You haven't added any students yet.</p>
      <Link to="/dashboard/addstudent">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition cursor-pointer">
          Add Student
        </button>
      </Link>
    </div>
  );
};

export default NoStudent;
