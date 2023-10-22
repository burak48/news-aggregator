import React from "react";
import { useLocation } from "react-router-dom";

interface NewsListProps {}

interface News {
  title?: string;
  webTitle?: string;
  headline?: {
    main: string;
  };
  description?: string;
  abstract?: string;
  url?: string;
  webUrl?: string;
  web_url?: string;
}

const NewsList: React.FC<NewsListProps> = () => {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="max-w-7xl mx-auto py-8 flex flex-wrap justify-start">
      {data.map((item: News, index: number) => (
        <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
            <div className="flex-grow m-2">
              <h3 className="text-xl font-semibold mb-2">
                {item.title || item.webTitle || item?.headline?.main}
              </h3>
              {item.description || item.abstract ? (
                <p className="text-gray-600 mb-2 line-clamp-3">
                  {item.description || item.abstract}
                </p>
              ) : null}
            </div>
            <a
              href={item.url || item.webUrl || item.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline m-2"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
