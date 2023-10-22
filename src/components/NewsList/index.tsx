import React from "react";
import { useLocation } from "react-router-dom";

interface NewsListProps {}

const NewsList: React.FC<NewsListProps> = () => {
  const location = useLocation();
  console.log("location: ", location)

  const data = location.state?.data;

  console.log("newsArray: ", data)
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item: any, index: number) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            {item.title || item.webTitle || item.headline.main}
          </h3>
          {item.description || item.abstract && (
            <p className="text-gray-600 mb-2">{item.description || item.abstract}</p>
          )}
          <a
            href={item.url || item.webUrl || item.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
