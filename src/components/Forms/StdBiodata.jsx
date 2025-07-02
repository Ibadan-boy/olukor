import { addDoc, collection } from "firebase/firestore";
import Button from "../UI/Button";
import { database } from "../../services/firebase";

const StdBiodata = () => {
  
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
    //console.log('Student form submitted');
    const formData = new FormData(event.target.form);
    const allData = Object.fromEntries(formData.entries());
    console.log(formData);

    try{
      await addDoc(collection(database, "students")), {
        ...allData,
        createdAt: new Date()
      }
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className= {generalClasses[0]}>
      <form className={generalClasses[1]} onSubmit={handleStudentSubmit}>

 
        <div className={generalClasses[2]}>
          <div className={generalClasses[3]}>
            <svg className="w-16 h-16 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <label
            htmlFor="profilePic"
            className={generalClasses[4]}
          >
            Upload Photo
          </label>
          <input type="file" id="profilePic" accept="image/*" className="hidden" name="photo"/>
        </div>


        <div className={generalClasses[5]}>
          <div>
            <label className={generalClasses[6]}>First Name</label>
            <input
              type="text"
              className={generalClasses[8]}
              name="firstName"
            />
          </div>

          <div>
            <label className={generalClasses[7]}>Last Name</label>
            <input
              type="text"
              className={generalClasses[8]}
              name="lastName"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Student ID</label>
          <input
            type="text"
            className={generalClasses[8]}
            name="studentId"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-blue-600" />
            <span className="text-slate-400">Male</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" className="accent-blue-600" />
            <span className="text-slate-400">Female</span>
          </label>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">Date Of Birth</label>
          <input
            type="date"
            className={generalClasses[8]}
            name="dateOfBirth"
          />
        </div>

        <div>
          <label className="block mb-2 text-slate-400">General Notes</label>
          <textarea
            rows="6"
            className={generalClasses[8]}
            placeholder="Enter any relevant notes here..."
            name="about-student"
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
