import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchAndFilter from "./components/SearchAndFilter";
import NewsList from "./components/NewsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchAndFilter />} />
        <Route path="/news" element={<NewsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
