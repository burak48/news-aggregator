import React, { useState } from "react";

function SearchAndFilter() {
  const initSearchParams = {
    keyword: "",
    date: "",
    category: "",
    source: "",
  };
  const [searchParams, setSearchParams] = useState(initSearchParams);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // onSearch(searchParams);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-gray-50 w-auto md:w-1/3">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Keyword"
            value={searchParams.keyword}
            onChange={() => {}}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row">
          <input
            type="date"
            value={searchParams.date}
            onChange={() => {}}
            className="p-2 border rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-1/2"
          />
          <select
            value={searchParams.category}
            onChange={() => {}}
            className="p-2 border rounded-md w-full sm:w-1/2"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
        </div>
        <select
          value={searchParams.source}
          onChange={() => {}}
          className="p-2 border rounded-md w-full"
        >
          <option value="">Select Source</option>
          <option value="source1">Source 1</option>
          <option value="source2">Source 2</option>
        </select>
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
