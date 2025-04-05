import React, { useState, useEffect } from 'react';

const SearchFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('PRODUCT CATEGORY');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  // Sample data - replace with your actual data
  const items = [
    { id: 1, name: 'Product 1', price: 100, date: '2024-01-01' },
    { id: 2, name: 'Product 2', price: 200, date: '2024-01-02' },
    // Add more items
  ];

  useEffect(() => {
    let result = [...items];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      default:
        // Featured sorting (default) - can implement custom logic
        break;
    }

    setFilteredItems(result);
  }, [searchQuery, sortBy]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const filterSections = {
    'PRODUCT CATEGORY': [
      { name: 'Accessories', count: 61 },
      { name: 'Air Therapy', count: 12 },
      { name: 'Cabinet Pieces', count: 395 },
      { name: 'Cords and Cables', count: 17 },
      { name: 'Covers', count: 118 },
    ],
    'YEAR': [
      { name: '2024', count: 50 },
      { name: '2023', count: 120 },
    ],
    'PRODUCT TYPE': [
      { name: 'Type A', count: 30 },
      { name: 'Type B', count: 45 },
    ],
    'PRODUCT COLLECTION': [
      { name: 'Collection X', count: 25 },
      { name: 'Collection Y', count: 35 },
    ],
    'PRODUCT MODEL': [
      { name: 'Model 1', count: 15 },
      { name: 'Model 2', count: 20 },
    ],
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Filter Section */}
        <div className="w-full md:w-64 bg-gray-50">
          <div className="bg-white shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
              <h2 className="text-base font-semibold">Filter by</h2>
            </div>

            <div className="divide-y">
              {Object.entries(filterSections).map(([section, items]) => (
                <div key={section} className="py-2 px-4">
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between py-2 text-sm font-bold"
                  >
                    {section}
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        openSection === section ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  {openSection === section && (
                    <div className="py-2 space-y-2 max-h-48 overflow-y-auto">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${section}-${item.name}`}
                            className="w-4 h-4 text-blue-600"
                          />
                          <label
                            htmlFor={`${section}-${item.name}`}
                            className="ml-2 text-sm text-gray-600"
                          >
                            {item.name} ({item.count})
                          </label>
                        </div>
                      ))}
                      {items.length > 5 && (
                        <button className="text-blue-600 text-sm font-medium">
                          Show More
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Results Section */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-end mb-6">
            <select 
              value={sortBy}
              onChange={handleSort}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Content area for filtered results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;