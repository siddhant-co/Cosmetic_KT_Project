"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // TODO: Route or trigger search logic
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      >
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
