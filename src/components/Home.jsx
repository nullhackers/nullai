import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBookmark } from "react-icons/fa";



const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav>
                <div className="flex items-center justify-between flex-wrap p-6">
                    <div className="flex items-center flex-shrink-0  mr-6">
                        <a href="/"> <span className="font-semibold text-xl tracking-tight">NULL AI</span></a>
                    </div>
                    <div className="block lg:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded border-gray-600"
                            onClick={toggleMenu}
                        >
                            <RxHamburgerMenu />
                        </button>
                    </div>
                    <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="text-sm lg:flex-grow">
                            <a
                                href="#"
                                className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                            >
                                About
                            </a>
                        </div>
                        <div>
                            <a
                                href="#"
                                className="inline-flex items-center text-sm px-4 py-2 leading-none border rounded  hover:border-transparent hover:text-gray-500 mt-4 lg:mt-0"
                            >
                                <FaBookmark className="mr-2" /> Bookmark 
                            </a>
                        </div>
                        
                    </div>
                </div>
            </nav>


{/* HOME */}

            <header className="h-40 flex flex-col items-center justify-cente sm:pt-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl ">
                        Elevating AI Exploration with <span className='font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>NULL AI</span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">Welcome to the world of AI</h2>
                </div>
            </header>

            
        </>
    );
};

export default Home