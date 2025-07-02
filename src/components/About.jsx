import AboutImg from '../assets/AboutImg.svg'
import Button from './UI/Button';
import { Link } from 'react-router-dom';

const About = () => {
    return(
      <>  
        <div className="h-1 w-full my-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" id='Aboutpage' />
        <h2 className="text-3xl mb-2 flex justify-center"> What Is Olukor About?</h2>
        <article className="mb-8 flex gap-7 items-end justify-center">
            <img src= {AboutImg} alt="about image" className='w-88 align-bottom'/>
            <div className= "w-96 self-center">
               
               <p className="text-xl text-wrap font-light text-justify">Welcome to your personalized student tracker dashboard! We know staying on top of your academic journey can be a challenge, and that's exactly why we built this tool. Here, you'll find everything you need to monitor your progress, manage your assignments, and achieve your academic goals with ease. From tracking grades and deadlines to visualizing your study habits, our intuitive dashboard empowers you to take control of your education. Simplify your student life and unlock your full potential – all in one place.</p>
            </div>
        </article>
        <p className='flex justify-center mb-16'>
          <Link to = '/login'><Button  color= 'bg-slate-300'>Get Started Now!</Button></Link>
        </p>
        <div className="h-1 w-full my-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        
      </>  
    )
}

export default About;