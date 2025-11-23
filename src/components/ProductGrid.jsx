import "../styles/ProductGrid.css";
 // make sure this path is correct

export default function ProductGrid({ products }) {
  return (
    <div className="grid-container">
      {products.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.image} alt={item.name} className="product-image" />

          <div className="product-info">
            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">${item.price}</p>
            <button className="add-btn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
