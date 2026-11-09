import { useState } from "react";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies or shows..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;