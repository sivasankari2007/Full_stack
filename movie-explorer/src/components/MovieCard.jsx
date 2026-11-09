import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const image =
    movie.image?.original ||
    movie.image?.medium ||
    "https://placehold.co/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <img
        src={image}
        alt={movie.name}
        onError={(e) => {
          e.target.src = "https://placehold.co/300x450?text=No+Image";
        }}
      />

      <div className="movie-info">
        <h3>{movie.name}</h3>

        <p>
          ⭐ {movie.rating?.average || "N/A"}
        </p>

        <p>
          {movie.premiered
            ? movie.premiered.substring(0, 4)
            : "Unknown"}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="details-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;