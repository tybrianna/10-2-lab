import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const DebounceSearchDemo: React.FC = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      console.log(`Searching for: ${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  return (
    <div className="debounce-container">
      <h1>Debounce Search Demo</h1>

      <input
        type="text"
        placeholder="Type to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="search-info">
        <p>
          <strong>Current Input:</strong> {search}
        </p>

        <p>
          <strong>Debounced Value:</strong> {debouncedSearch}
        </p>
      </div>
    </div>
  );
};

export default DebounceSearchDemo;