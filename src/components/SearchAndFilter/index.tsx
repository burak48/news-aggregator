import { useState } from "react";
import { getNews } from "../../api/index";
import { useNavigate } from "react-router-dom";

function SearchAndFilter() {
  const navigate = useNavigate();

  const initSearchParams = {
    keyword: "",
    date: "",
    category: "",
    source: "",
  };
  const [searchParams, setSearchParams] = useState(initSearchParams);

  const handleSearch = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await getNews(searchParams);

    if (response && response.articles) {
      navigate("/news", { state: { data: response.articles } }); // Use response.articles here
    } else if (response.response && response.response.results) {
        navigate("/news", { state: { data: response.response.results } }); // Use response.results here
    } else if (response.response && response.response.docs) {
        navigate("/news", { state: { data: response.response.docs } }); // Use response.docs here
    }
  };

  const categoryOptions = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const sourceOptions = [
    { value: "", label: "Select Source" },
    { value: "newsApi", label: "NewsAPI" },
    { value: "theGuardian", label: "The Guardian" },
    { value: "newYorkTimes", label: "New York Times" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setSearchParams({ ...searchParams, [field]: value });
  };

  return (
    <>
      <h1 className="text-3xl text-center m-4 font-bold underline">
        Welcome to News Aggregator!
      </h1>
      <div className="min-h-full flex flex-col items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg bg-gray-50 w-auto md:w-1/3">
          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Keyword"
                value={searchParams.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4 flex flex-col sm:flex-row">
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="p-2 border rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-1/2"
              />
              <select
                value={searchParams.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="p-2 border rounded-md w-full sm:w-1/2"
              >
                <option value="">Select Category</option>
                {searchParams.source === "newsApi" &&
                  categoryOptions.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <select
              value={searchParams.source}
              onChange={(e) => handleInputChange("source", e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              {sourceOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchAndFilter;
