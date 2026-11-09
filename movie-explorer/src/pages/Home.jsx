import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const API_URL = "https://api.tvmaze.com";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("Popular Shows");

  const fetchData = async (url) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();

      const results =
        Array.isArray(data) && data.length > 0 && data[0].show
          ? data.map((item) => item.show)
          : data;

      if (Array.isArray(results)) {
        setMovies(results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setMovies([]);
      setError("Unable to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = (searchText) => {
    setTitle(`Search Results for "${searchText}"`);

    fetchData(
      `${API_URL}/search/shows?q=${encodeURIComponent(searchText)}`
    );
  };

  const fetchCategory = async (category) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/shows?page=0`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();

      if (category === "popular") {
        setTitle("Popular Shows");
        setMovies(data);
      } else {
        setTitle(`${category} Shows`);

        const filtered = data.filter((show) =>
          show.genres?.some(
            (genre) =>
              genre.toLowerCase() === category.toLowerCase()
          )
        );

        setMovies(filtered);
      }
    } catch (error) {
      setMovies([]);
      setError("Unable to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory("popular");
  }, []);

  return (
    <div>
      <Header />

      <main className="container">
        <section className="hero">
          <h1>Discover Movies</h1>

          <p>
            Search and explore your favorite movies and shows
          </p>

          <SearchBar onSearch={searchMovies} />
        </section>

        <CategoryFilter
          onCategoryChange={fetchCategory}
        />

        {loading && <Loading />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && movies.length === 0 && (
          <div className="no-movies">
            <h2>No movies found</h2>
            <p>Try another search or category.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <h2 className="section-title">
              {title}
            </h2>

            <MovieGrid movies={movies} />
          </>
        )}
      </main>
    </div>
  );
}

export default Home;