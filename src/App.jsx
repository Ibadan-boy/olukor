import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./components/HomePage";
import SignUp from "./components/Forms/SignUp";
import Login from "./components/Forms/Login";
import MainLayout from "./components/MainLayout";
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Dashboard from './components/Dashboard';
import WelcomePage from './components/WelcomeDashboard';
import StdBiodata from './components/Forms/StdBiodata';
import EnrolledStd from './components/EnrolledStd';
import TeacherProfile from './components/TeacherProfile';
import StudentProfile from './components/StudentProfile';

const route = createBrowserRouter([
  { path: '/', element: <MainLayout/>,
    errorElement: <ErrorPage/>, 
    children: [
    { path: 'login', element: <Login/> },
  { path: 'signup', element: <SignUp/> },
  { index: true, element: <HomePage/> },
  { path: 'Aboutpage', element: <About/> },
  { path: 'errorpage', element: <ErrorPage/> },
  {
    path: 'dashboard',
    element: <Dashboard/>,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'students', element: <EnrolledStd />},
      { path: 'profile', element: <TeacherProfile/> },
      { path: 'addstudent', element: <StdBiodata/> },
      { path: 'settings', element: <ErrorPage/> },
      { path: 'studentprofile', element: <StudentProfile/> },
    ]
  } 
  ] },
  
])
 
function App() {
  
  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App;