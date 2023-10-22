import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchAndFilter from "./components/SearchAndFilter";
import NewsList from "./components/NewsList";
import Header from "./components/Header"; // Import the Header component

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<SearchAndFilter />} />
          <Route path="/news" element={<NewsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
