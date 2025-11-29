import { useEffect, useState } from "react";
import "../styles/products1.css";
import back3 from "../assets/back3.mp4";
import VideoBackground from "../components/videobackground.jsx";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const getSortLabel = () => {
    if (!sortBy) return "Sort By";
    switch (sortBy) {
      case "price_asc": return "Price: Low to High";
      case "price_desc": return "Price: High to Low";
      case "name_asc": return "Name: A → Z";
      case "name_desc": return "Name: Z → A";
      default: return "Sort By";
    }
  };

  // Fetch products and categories
  useEffect(() => {
    fetch("http://localhost:8000/api/getProducts.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
        else console.error(data.error);
      })
      .catch((err) => console.error(err));

    fetch("http://localhost:8000/api/getCategories.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filtered and sorted products
  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "all" ? true : p.Category === selectedCategory
    )
    .filter((p) => p.Price >= priceRange[0] && p.Price <= priceRange[1])
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "price_asc") return a.Price - b.Price;
      if (sortBy === "price_desc") return b.Price - a.Price;
      if (sortBy === "name_asc") return a.ProductName.localeCompare(b.ProductName);
      if (sortBy === "name_desc") return b.ProductName.localeCompare(a.ProductName);
      return 0;
    });

  return (
    <div className="productspage">
    <div className="products-page">
    <VideoBackground src={back3} />
      {/* Filters Panel */}
      <aside className="filters glass">
        <h2>Filters</h2>

        {/* Category Filter */}
        <div className="filter-box category-box">
          <h3>Categories</h3>
          <button
            className="category-btn"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            {selectedCategory === "all" ? "All" : selectedCategory}
          </button>
          {categoryOpen && (
            <div className="category-popup">
              <p onClick={() => { setSelectedCategory("all"); setCategoryOpen(false); }}>All</p>
              {categories.map((c) => (
                <p key={c.name} onClick={() => { setSelectedCategory(c.name); setCategoryOpen(false); }}>
                  {c.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="filter-box">
          <h3>Price Range</h3>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>0$ - {priceRange[1]}$</p>
        </div>

        {/* Sort Filter */}
        <div className="filter-box sort-box">
          <button
            className="category-btn"
            onClick={() => setSortOpen(!sortOpen)}
          >
            {getSortLabel()}
          </button>
          {sortOpen && (
            <div className="sort-popup">
              <p onClick={() => { setSortBy("price_asc"); setSortOpen(false); }}>Price: Low to High</p>
              <p onClick={() => { setSortBy("price_desc"); setSortOpen(false); }}>Price: High to Low</p>
              <p onClick={() => { setSortBy("name_asc"); setSortOpen(false); }}>Name: A → Z</p>
              <p onClick={() => { setSortBy("name_desc"); setSortOpen(false); }}>Name: Z → A</p>
            </div>
          )}
        </div>
      </aside>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.ProductID} className="product-card glass">
              <img
                src={`/products/${p.ProductID}.webp`}
                alt={p.ProductName}
              />
              <h3>{p.ProductName}</h3>
              <p className="price">${p.Price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
    </div>
  );
}
