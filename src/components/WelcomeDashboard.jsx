import { useDarkMode } from "./ThemeChanger";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-800 via-slate-700 to-indigo-800 text-white px-4 text-center">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Track your students' progress from anywhere
      </h1>
      <p className="text-lg sm:text-xl text-white/90">
        The world's leading student tracker
      </p>
    </div>
  );
};

export default WelcomePage;
