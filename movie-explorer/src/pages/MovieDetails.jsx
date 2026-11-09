import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const API_URL = "https://api.tvmaze.com";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/shows/${id}`
        );

        if (!response.ok) {
          throw new Error("Movie not found");
        }

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <ErrorMessage message={error} />
      </>
    );
  }

  if (!movie) {
    return null;
  }

  const image =
    movie.image?.original ||
    movie.image?.medium ||
    "https://placehold.co/500x750?text=No+Image";

  return (
    <div>
      <Header />

      <main className="details-container">
        <Link to="/" className="back-button">
          ← Back to Movies
        </Link>

        <div className="details-card">
          <img
            src={image}
            alt={movie.name}
            className="details-poster"
          />

          <div className="details-content">
            <h1>{movie.name}</h1>

            <p className="rating">
              ⭐ {movie.rating?.average || "N/A"} / 10
            </p>

            <p>
              <strong>Language:</strong>{" "}
              {movie.language || "Unknown"}
            </p>

            <p>
              <strong>Premiered:</strong>{" "}
              {movie.premiered || "Unknown"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {movie.status || "Unknown"}
            </p>

            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.join(", ") || "Unknown"}
            </p>

            <h2>Summary</h2>

            <div
              className="overview"
              dangerouslySetInnerHTML={{
                __html:
                  movie.summary ||
                  "<p>No description available.</p>"
              }}
            />

            {movie.officialSite && (
              <a
                href={movie.officialSite}
                target="_blank"
                rel="noreferrer"
                className="official-button"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieDetails;