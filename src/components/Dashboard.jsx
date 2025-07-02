import deleteIcon from '../assets/delete-icon.svg';
import { NavLink, Outlet } from 'react-router-dom';


//const myStyles = 'text-left px-4 py-2 rounded hover:bg-gray-700 transition'


const Dashboard = () => {
  return (
    <>
    <div className="flex">
      <aside className="flex flex-col space-y-4 p-6 w-64 min-h-screen bg-gray-800 text-white">
        <NavLink to='profile' className={({ isActive }) =>`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${isActive && "font-bold text-blue-600"}`} end>View Profile</NavLink>
        <NavLink to = 'students' className={({ isActive }) =>`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${isActive && "font-bold text-blue-600"}`} end>Students</NavLink>
        <NavLink to='settings' className={({ isActive }) =>`text-left px-4 py-2 rounded hover:bg-gray-700 transition ${isActive && "font-bold text-blue-600"}`} end>Settings</NavLink>
        <div className="flex gap-2 text-left px-4 py-2 rounded text-red-500 hover:text-red-400 hover:bg-gray-700 transition">
          <button className="">Delete Account</button>
          <img className="h-5" src={deleteIcon}/>
        </div> 
      </aside>
      <main className='flex-1 p-6'>
        <Outlet/>
      </main>
    </div>
    </>

    
  );
};

export default Dashboard;
