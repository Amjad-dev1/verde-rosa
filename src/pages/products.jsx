import back3 from "../assets/back3.mp4";
import VideoBackground from "../components/videobackground.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import "../styles/products.css";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";


export default function Products() {
  const products = [
    { id: 1, name: "Rose Bouquet", price: 30, image: p1 },
    { id: 2, name: "Tulip Mix", price: 25, image: p2 },
    { id: 3, name: "Orchid Vase", price: 45, image: p3 },
    { id: 4, name: "Sunflower Bundle", price: 20, image: p4 },
    { id: 5, name: "Peony Pink", price: 50, image : p5},
  ];

  return (
    <>
      

      <div className="products-section">
        <VideoBackground src={back3} />
        <h1 className="products-title">Our Flowers</h1>
        <ProductGrid products={products} />
      </div>
    </>
  );
};
