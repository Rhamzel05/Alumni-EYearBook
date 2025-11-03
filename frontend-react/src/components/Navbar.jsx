import React from "react";
import { Star, Info, Mail, Rocket } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      {/* Desktop Navbar (top) */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 py-5 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 hidden md:flex">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> MyBrand </h1>
        <div className="space-x-8 flex items-center">
          <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"> Features </a>
          <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"> About </a>
          <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"> Contact </a>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
          Get Started
        </button>
      </nav>

      {/* Mobile Navbar (bottom) */}
      <nav className="w-full flex justify-around items-center px-4 py-3 bg-white dark:bg-gray-900 shadow-t md:hidden fixed bottom-0 left-0 z-50 border-t border-gray-200 dark:border-gray-800">
        <a href="#features" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
          <Star className="w-6 h-6 mb-0.5" />
          <span className="text-xs">Features</span>
        </a>
        <a href="#about" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
          <Info className="w-6 h-6 mb-0.5" />
          <span className="text-xs">About</span>
        </a>
        <a href="#contact" className="flex flex-col items-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
          <Mail className="w-6 h-6 mb-0.5" />
          <span className="text-xs">Contact</span>
        </a>
        <a href="#get-started" className="flex flex-col items-center">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2 shadow-lg flex items-center justify-center">
            <Rocket className="w-6 h-6" />
          </span>
          <span className="text-xs text-indigo-600 dark:text-indigo-300 font-semibold mt-0.5">Start</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;