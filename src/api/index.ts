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
  const newDate = date.split("-").join("")

  switch (source) {
    case "newsApi":
      return {
        baseURL: `${import.meta.env.VITE_APP_NEWSAPI_API_URL}/v2/top-headlines?q=${keyword}&category=${category}&from=${date}`,
        apiKey: import.meta.env.VITE_APP_NEWSAPI_KEY,
      };
    case "theGuardian":
      return {
        baseURL: `${import.meta.env.VITE_APP_THEGUARDIAN_API_URL}/search?q=${keyword}&from-date=${date}&api-key=${import.meta.env.VITE_APP_THEGUARDIAN_API_KEY}`,
      };
    case "newYorkTimes":
      return {
        baseURL: `${import.meta.env.VITE_APP_NEWYORKTIMES_API_URL}/svc/search/v2/articlesearch.json?q=${keyword}&begin_date=${newDate}&api-key=${import.meta.env.VITE_APP_NEWYORKTIMES_API_KEY}`,
      };
    default:
      return null;
  }
}

const API_ENDPOINTS: Record<string,(keyword?: string, date?: string, category?: string) => ApiEndpoint | null> = {
  newsApi: (keyword: string | undefined, date: string | undefined, category: string | undefined) => createApiEndpoint("newsApi", keyword, date, category),
  theGuardian: (keyword: string | undefined, date: string | undefined) => createApiEndpoint("theGuardian", keyword, date),
  newYorkTimes: (keyword: string | undefined, date: string | undefined) => createApiEndpoint("newYorkTimes", keyword, date)
};

export async function getNews(formData: FormData) {
  const selectedSource = formData.source;

  const apiEndpoint = API_ENDPOINTS[selectedSource](
    formData.keyword,
    formData.date,
    formData.category
  );

  if (apiEndpoint) {
    try {
      let proxyPath;
      switch(selectedSource) {
        case "newsApi":
          proxyPath = "/newsapi";
          break;
        case "theGuardian":
          proxyPath = "/theGuardian";
          break;
        case "newYorkTimes":
          proxyPath = "/nytimes";
          break;
        default:
          console.log(`Invalid source selected: ${selectedSource}`)
      }
      const api = axios.create({
        baseURL: proxyPath + apiEndpoint.baseURL.replace(import.meta.env[`VITE_APP_${selectedSource.toUpperCase()}_API_URL`], ''),
        headers: {
          Authorization: `Bearer ${apiEndpoint.apiKey}`
        },
      });

      const response = await api.get("")
      const data = response.data;
      console.log(`Data from ${selectedSource}:`, data);
      return data;
    } catch (error) {
      console.error(`Error from ${selectedSource}:`, error);
    }
  } else {
    console.error(`Invalid source selected: ${selectedSource}`);
  }
}
