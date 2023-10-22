import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-white text-2xl font-bold">
          Home
        </Link>
      </div>
    </header>
  );
};

export default Header;
