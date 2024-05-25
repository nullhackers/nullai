import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';
import { BiReset } from "react-icons/bi";
import { FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';
import Home from './components/Home';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadData((currentPage - 1) * pageLimit, currentPage * pageLimit);
  }, [currentPage]);  

  useEffect(() => {
    loadTotalItems();
  }, []);  

  const loadData = async (start, end) => {
    try {
      const response = await axios.get(`https://nullai.onrender.com/data?_start=${start}&_end=${end}`);
      const searchData = value.trim().toLowerCase(); // Convert search value to lowercase and trim whitespace
      const filteredData = response.data.filter(item => item.title.toLowerCase().includes(searchData));
      setData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTotalItems = async () => {
    try{
      const response = await axios.get('https://nullai.onrender.com/data');
      setTotalItems(response.data.length);
    }catch(error){
      console.error(error);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(totalItems / pageLimit);
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // loadData(currentPage * pageLimit, (currentPage + 1) * pageLimit);
    }
  };
  const handlePrevious = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // loadData((currentPage - 2) * pageLimit, (currentPage - 1) * pageLimit);
    }
  };


  const handleFilter = async (category) => {
    return await axios
      .get(`https://nullai.onrender.com/data?category=${category}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleReset = () => {
    // loadData();
    setCurrentPage(1);
    setValue('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadData();
  };


  return (
    <>
      < Home />

      {/* TABS */}
      <div className="flex justify-center m-10">
        <div className="flex flex-col items-center shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
          <div className="flex flex-wrap justify-center w-full space-x-4 p-2">
            <button onClick={() => handleFilter('Top')} className="px-4 py-2 mb-2 rounded bg-blue-500 text-white">Top</button>
            <button onClick={() => handleFilter('Video')} className="px-4 py-2 mb-2 rounded bg-blue-500 text-white">Video</button>
            <button onClick={() => handleFilter('Social')} className="px-4 py-2 mb-2 rounded bg-blue-500 text-white">Social</button>
          </div>
        </div>
      </div>


      {/* Search */}
      <form className="flex items-center max-w-sm mx-auto mt-10" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="bg-gray-500 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search ..."
          />
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <span className='w-4 h-4'> <IoSearch /> </span>
        </button>
        <button type="reset" onClick={handleReset} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <span className='w-4 h-4'> <BiReset /> </span>
        </button>
      </form>

      <section className="flex flex-wrap m-6 justify-center">
        {data.length === 0 ? (
          <h1 className="text-3xl font-bold text-center">No Data Found</h1>
        ) : (
          data.map((item, index) => (
            <div key={index} className="max-w-xs rounded overflow-hidden shadow-md mx-2 my-4 shadow-slate-700">
              <div className="px-6 py-4 flex flex-col h-full justify-between">
                <div>
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-green-500 text-base">{item.category}</p>
                  <p className="text-sm mt-2">{item.description}</p>
                </div>
                <div className="flex justify-between py-4">
                  <div>
                    <FaBookmark className="text-blue-500 mr-2 inline-block align-middle" />
                    <span className="text-gray-400 text-sm">Bookmark</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Open Link</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="text-blue-500 ml-2 inline-block align-middle" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="flex justify-center mt-6">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="mr-4 px-4 py-2.5 bg-gray-200 text-gray-600 rounded-lg">Previous</button>
        <span className="">{currentPage}</span>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(totalItems / pageLimit)} className="ml-4 px-4 py-2.5 bg-gray-200 text-gray-600 rounded-lg">Next</button>
      </div>
    </>
  );
}

export default App;
