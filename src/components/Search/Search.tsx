import React, { useState } from "react";
import "./Search.css";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const sampleData = [
  { id: "1", title: "React Basics" },
  { id: "2", title: "TypeScript Tutorial" },
  { id: "3", title: "Frontend Testing" },
  { id: "4", title: "Redux Guide" },
  { id: "5", title: "React Hooks Demo" },
];

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof sampleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    setLoading(true);
    setError("");
    setResults(null);

    // Simulating an API call delay here to show the loading state per requirement
    setTimeout(() => {
      try {
        const filteredData = sampleData.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase()),
        );
        setResults(filteredData);
        if (filteredData.length === 0) {
          setError("No results found.");
        }
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
        onSearch(value);
      }
    }, 500);
  };

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    setError("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          className="search-input"
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          aria-describedby="search-error"
        />
        {query && (
          <button
            className="clear-button"
            aria-label="Clear search"
            onClick={clearSearch}
          >
            Clear
          </button>
        )}
      </div>

      {loading && <p className="loading-state">Loading...</p>}

      {error && !loading && (
        <p className="error-state" id="search-error" role="alert">
          {error}
        </p>
      )}

      {results && !loading && (
        <ul className="results-list">
          {results.map((result) => (
            <li key={result.id} className="result-item" tabIndex={0}>
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
