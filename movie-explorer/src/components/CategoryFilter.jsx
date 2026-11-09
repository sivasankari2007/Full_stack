function CategoryFilter({ onCategoryChange }) {
  const categories = [
    "Drama",
    "Comedy",
    "Action",
    "Adventure",
    "Crime",
    "Horror",
    "Science-Fiction"
  ];

  return (
    <div className="categories">
      <button onClick={() => onCategoryChange("popular")}>
        Popular
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;