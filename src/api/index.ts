import axios from "axios";

type FormData = {
  keyword: string;
  date: string;
  category: string;
  source: string;
};

type ApiEndpoint = {
  baseURL: string;
  apiKey?: string;
};

function createApiEndpoint(source: string, keyword = "", date = "", category = "") {
  console.log("source: ", source);
  console.log("keyword: ", keyword);
  console.log("date: ", date);
  const newDate = date.split("-").join("")
  console.log("newDate: ", newDate)

  switch (source) {
    case "newsApi":
      return {
        baseURL: `${
          import.meta.env.VITE_APP_NEWS_API_URL
        }/v2/top-headlines?q=${keyword}&category=${category}&from=${date}`,
        apiKey: import.meta.env.VITE_APP_NEWS_API_KEY,
      };
    case "openNews":
      return {
        baseURL: `${
          import.meta.env.VITE_APP_OPEN_NEWS_API_URL
        }/api/1/archive?q=${keyword}&category=${category}&from_date=${date}&apikey=${import.meta.env.VITE_APP_OPEN_NEWS_API_KEY}`,
      };
    case "theGuardian":
      return {
        baseURL: `${import.meta.env.VITE_APP_GUARDIAN_API_URL}/search?q=${keyword}&from-date=${date}&api-key=${import.meta.env.VITE_APP_GUARDIAN_API_KEY}`,
      };
    case "newYorkTimes":
      return {
        baseURL: `${
          import.meta.env.VITE_APP_NEW_YORK_TIMES_API_URL
        }/svc/search/v2/articlesearch.json?q=${keyword}&begin_date=${newDate}&api-key=${import.meta.env.VITE_APP_NEW_YORK_TIMES_API_KEY}`,
      };
    default:
      return null;
  }
}

const API_ENDPOINTS: Record<string,(keyword?: string, date?: string, category?: string) => ApiEndpoint | null> = {
  newsApi: (keyword: string | undefined, date: string | undefined, category: string | undefined) => createApiEndpoint("newsApi", keyword, date, category),
  openNews: (keyword: string | undefined, date: string | undefined, category: string | undefined) => createApiEndpoint("openNews", keyword, date, category),
  theGuardian: (keyword: string | undefined, date: string | undefined) => createApiEndpoint("theGuardian", keyword, date),
  newYorkTimes: (keyword: string | undefined, date: string | undefined) => createApiEndpoint("newYorkTimes", keyword, date)
};

export async function getNews(formData: FormData) {
  console.log("formData: ", formData);

  const selectedSource = formData.source;
  console.log("API_ENDPOINTS[selectedSource]: ", API_ENDPOINTS[selectedSource]);

  const apiEndpoint = API_ENDPOINTS[selectedSource](
    formData.keyword,
    formData.date,
    formData.category
  );

  if (apiEndpoint) {
    try {
      // const proxyUrl = 'https://cors-anywhere-herokuapp.com/';
      const api = axios.create({
        // baseURL: selectedSource === "openNews" ? proxyUrl + apiEndpoint.baseURL : apiEndpoint.baseURL,
        baseURL: apiEndpoint.baseURL,
        headers: {
          Authorization: `Bearer ${apiEndpoint.apiKey}`
        },
      });

      api.interceptors.request.use(
        (config) => {
          config.headers['Access-Control-Allow-Origin'] = '*';
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      const response = await api.get("")
      const data = response.data;
      console.log(`Data from ${selectedSource}:`, data);
    } catch (error) {
      console.error(`Error from ${selectedSource}:`, error);
    }
  } else {
    console.error(`Invalid source selected: ${selectedSource}`);
  }
}
