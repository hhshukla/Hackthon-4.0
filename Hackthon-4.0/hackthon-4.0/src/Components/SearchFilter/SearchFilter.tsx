// import React, { useState, useEffect } from 'react';
// import { useTheme } from "next-themes";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const SearchFilter = () => {
//   const { theme } = useTheme();
//   // Add Speech Recognition hooks here, before any conditional returns
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   // Replace the static items with API data
//   const [items, setItems] = useState<any[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [brands, setBrands] = useState<string[]>([]);

//   // Add loading state
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch data from API
//   // Add mock data at the top of your component
//   const mockData = [
//     {
//       id: 1,
//       name: 'Product 1',
//       Category: 'Accessories',
//       Brand: 'Brand A',
//       price: 99.99,
//       date: '2024-01-01'
//     },
//     {
//       id: 2,
//       name: 'Product 2',
//       Category: 'Air Therapy',
//       Brand: 'Brand B',
//       price: 149.99,
//       date: '2024-01-02'
//     },
//     // Add more mock items as needed
//   ];

//   // Modify the useEffect for fetching data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://horizontaltrainingsc.dev.local/api/HZTLData/index', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//           },
//           mode: 'cors', // Enable CORS
//         });

//         console.log('API Response Status:', response.status);
//         console.log('API Response Headers:', response.headers);

//         // Handle different error status codes
//         if (response.status === 500) {
//           console.error('Server error detected, falling back to mock data');
//           setItems(mockData);
//           const uniqueCategories = [...new Set(mockData.map(item => item.Category))];
//           const uniqueBrands = [...new Set(mockData.map(item => item.Brand))];
//           setCategories(uniqueCategories);
//           setBrands(uniqueBrands);
//           return;
//         }

//         if (!response.ok) {
//           console.error(`API Error: ${response.status} - ${response.statusText}`);
//           throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//         }

//         const result = await response.json();
//         console.log('API Response Data:', result);

//         if (result && result.data) {
//           setItems(result.data);
//           const uniqueCategories = [...new Set(result.data.map((item: any) => item.Category || ''))];
//           const uniqueBrands = [...new Set(result.data.map((item: any) => item.Brand || ''))];
//           setCategories(uniqueCategories.filter(Boolean) as string[]);
//           setBrands(uniqueBrands.filter(Boolean) as string[]);
//         } else {
//           console.warn('Invalid API response structure:', result);
//           setItems(mockData);
//           const uniqueCategories = [...new Set(mockData.map(item => item.Category))];
//           const uniqueBrands = [...new Set(mockData.map(item => item.Brand))];
//           setCategories(uniqueCategories);
//           setBrands(uniqueBrands);
//         }
//       } catch (error) {
//         console.error('Error details:', {
//           // message: error.message,
//           // stack: error.stack,
//         });
//         setItems(mockData);
//         const uniqueCategories = [...new Set(mockData.map(item => item.Category))];
//         const uniqueBrands = [...new Set(mockData.map(item => item.Brand))];
//         setCategories(uniqueCategories);
//         setBrands(uniqueBrands);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const [mounted, setMounted] = useState(false);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [openSection, setOpenSection] = useState<string | null>('PRODUCT CATEGORY');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('featured');
//   const [filteredItems, setFilteredItems] = useState<any[]>(items);
//   const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});

//   const handleFilterChange = (section: string, itemName: string, checked: boolean) => {
//     setSelectedFilters(prev => {
//       const sectionFilters = prev[section] || [];
//       if (checked) {
//         return { ...prev, [section]: [...sectionFilters, itemName] };
//       } else {
//         return {
//           ...prev,
//           [section]: sectionFilters.filter(name => name !== itemName)
//         };
//       }
//     });
//   };

//   const removeFilter = (section: string, itemName: string) => {
//     setSelectedFilters(prev => ({
//       ...prev,
//       [section]: prev[section].filter(name => name !== itemName)
//     }));
//   };

//   // Add these new state variables after other state declarations
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Add this pagination calculation function before the return statement
//   const paginateResults = (items: any[]) => {
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     return items.slice(indexOfFirstItem, indexOfLastItem);
//   };

//   // Modify the useEffect that handles filtering to include pagination
//   useEffect(() => {
//     let result = [...items];

//     // Apply search filter
//     if (searchQuery) {
//       result = result.filter(item =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply selected filters
//     Object.entries(selectedFilters).forEach(([section, selectedValues]) => {
//       if (selectedValues.length > 0) {
//         result = result.filter(item => {
//           // This is a simplified filter logic. Adjust according to your data structure
//           return selectedValues.some(value => item.name.includes(value));
//         });
//       }
//     });

//     // Apply sorting
//     switch (sortBy) {
//       case 'price-low':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'newest':
//         result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//         break;
//       default:
//         break;
//     }

//     setFilteredItems(result);
//     // Only reset page when filters/search change, not on initial load
//     if (searchQuery || Object.keys(selectedFilters).length > 0 || sortBy !== 'featured') {
//       setCurrentPage(1);
//     }
//   }, [searchQuery, sortBy, items, selectedFilters]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortBy(e.target.value);
//   };

//   const filterSections = {
//     'PRODUCT CATEGORY': [
//       { name: 'Accessories', count: 61 },
//       { name: 'Air Therapy', count: 12 },
//       { name: 'Cabinet Pieces', count: 395 },
//       { name: 'Cords and Cables', count: 17 },
//       { name: 'Covers', count: 118 },
//     ],
//     'YEAR': [
//       { name: '2024', count: 50 },
//       { name: '2023', count: 120 },
//     ],
//     'PRODUCT TYPE': [
//       { name: 'Type A', count: 30 },
//       { name: 'Type B', count: 45 },
//     ],
//     'PRODUCT COLLECTION': [
//       { name: 'Collection X', count: 25 },
//       { name: 'Collection Y', count: 35 },
//     ],
//     'PRODUCT MODEL': [
//       { name: 'Model 1', count: 15 },
//       { name: 'Model 2', count: 20 },
//     ],
//   };

//   const toggleSection = (section: string) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (transcript) {
//       setSearchQuery(transcript);
//     }
//   }, [transcript]);

//   const startListening = () => {
//     if (!browserSupportsSpeechRecognition) {
//       alert('Browser does not support speech recognition.');
//       return;
//     }
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//   };

//   // Add this check at the beginning of your component
//   if (!browserSupportsSpeechRecognition) {
//     console.log('Browser does not support speech recognition.');
//   }

//   if (!mounted) return null;

//   // Add this line before the return statement to calculate paginated items
//   const paginatedItems = paginateResults(filteredItems);

//   // Add this pagination handler
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   // Add this to calculate total pages
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-6 mt-20">
//       <div className="flex flex-col md:flex-row gap-4 items-start">
//         {/* Filter Section */}
//         <div className="w-full md:w-64">
//           <div className="bg-white dark:bg-[#1a1f2b] shadow-sm rounded-lg">
//             <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700 border-gray-200">
//               <svg className="w-5 h-5 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
//               </svg>
//               <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">Filter by</h2>
//             </div>

//             <div className="divide-y dark:divide-gray-700 divide-gray-200">
//               {Object.entries(filterSections).map(([section, items]) => (
//                 <div key={section} className="py-2 px-4">
//                   <button
//                     onClick={() => toggleSection(section)}
//                     className="w-full flex items-center justify-between py-2 text-sm font-bold text-gray-800 dark:text-gray-200"
//                   >
//                     {section}
//                     <svg
//                       className={`w-4 h-4 transform transition-transform ${
//                         openSection === section ? 'rotate-180' : ''
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
//                     </svg>
//                   </button>

//                   {openSection === section && (
//                     <div className="py-2 space-y-2 max-h-48 overflow-y-auto">
//                       {items.map((item, idx) => (
//                         <div key={idx} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`${section}-${item.name}`}
//                             checked={selectedFilters[section]?.includes(item.name) || false}
//                             onChange={(e) => handleFilterChange(section, item.name, e.target.checked)}
//                             className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded"
//                           />
//                           <label
//                             htmlFor={`${section}-${item.name}`}
//                             className="ml-2 text-sm text-gray-600 dark:text-gray-300"
//                           >
//                             {item.name} ({item.count})
//                           </label>
//                         </div>
//                       ))}
//                       {items.length > 5 && (
//                         <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
//                           Show More
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Search and Results Section */}
//         <div className="flex-1">
//           {/* Selected Filters Display */}
//           <div className="mb-4 flex flex-wrap gap-2">
//             {Object.entries(selectedFilters).map(([section, items]) =>
//               items.map((item) => (
//                 <div
//                   key={`${section}-${item}`}
//                   className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm text-blue-800 dark:text-blue-200"
//                 >
//                   <span>{item}</span>
//                   <button
//                     onClick={() => removeFilter(section, item)}
//                     className="hover:text-blue-600"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
//                     </svg>
//                   </button>
//                 </div>
//               ))
//             )}
//             {Object.keys(selectedFilters).length > 0 && (
//               <button
//                 onClick={() => setSelectedFilters({})}
//                 className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//               >
//                 Clear all
//               </button>
//             )}
//           </div>

//           {/* Search Input with Voice Control */}
//           <div className="mb-6">
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="w-full px-4 py-2 bg-white dark:bg-[#1a1f2b] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
//               />
//               <button
//                 onClick={listening ? stopListening : startListening}
//                 className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
//                   listening ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
//                 }`}
//                 title={listening ? 'Stop voice search' : 'Start voice search'}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
//                 </svg>
//               </button>
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
//                 </svg>
//               </button>
//             </div>
//             {listening && (
//               <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 Listening... Click the microphone to stop.
//               </div>
//             )}
//           </div>

//           {/* Sort Dropdown */}
//           <div className="flex justify-end mb-6">
//             <select
//               value={sortBy}
//               onChange={handleSort}
//               className="px-4 py-2 bg-white dark:bg-[#1a1f2b] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200"
//             >
//               <option value="featured">Sort by: Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>

//           {/* Add Pagination Controls */}
//           <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1f2b] px-4 py-3 sm:px-6 mb-6 rounded-lg">
//             <div className="flex flex-1 justify-between sm:hidden">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
//                   ${currentPage === 1
//                     ? 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
//                     : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-[#1a1f2b] dark:hover:bg-gray-800'
//                   }`}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
//                   ${currentPage === totalPages
//                     ? 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
//                     : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-[#1a1f2b] dark:hover:bg-gray-800'
//                   }`}
//               >
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700 dark:text-gray-200">
//                   Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(currentPage * itemsPerPage, filteredItems.length)}
//                   </span> of{' '}
//                   <span className="font-medium">{filteredItems.length}</span> results
//                 </p>
//               </div>
//               <div>
//                 <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`relative inline-flex items-center rounded-l-md px-2 py-2
//                       ${currentPage === 1
//                         ? 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
//                         : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-[#1a1f2b] dark:hover:bg-gray-800'
//                       }`}
//                   >
//                     <span className="sr-only">Previous</span>
//                     <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                   {[...Array(totalPages)].map((_, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handlePageChange(idx + 1)}
//                       className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
//                         ${currentPage === idx + 1
//                           ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
//                           : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800'
//                         }`}
//                     >
//                       {idx + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`relative inline-flex items-center rounded-r-md px-2 py-2
//                       ${currentPage === totalPages
//                         ? 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800'
//                         : 'text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-[#1a1f2b] dark:hover:bg-gray-800'
//                       }`}
//                   >
//                     <span className="sr-only">Next</span>
//                     <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>

//           {/* Content area for filtered results */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {paginatedItems.map(item => (
//               <div key={item.id} className="rounded-lg shadow p-4 bg-white dark:bg-[#1a1f2b] border border-gray-200 dark:border-gray-700">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
//                   {item.name}
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   ${item.price}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {item.date}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;
