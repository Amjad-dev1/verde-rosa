import { useState } from "react";
import "../styles/featuredbouquets.css";

import winterImg from "../assets/winter.webp";
import summerImg from "../assets/summer.webp";
import fallImg from "../assets/fall.webp";

export default function FeaturedBouquets() {
  const bouquets = [
    {
      name: "Winter Bloom",
      img: winterImg,
      desc: "Cool tones, crisp whites, and serene seasonal blossoms."
    },
    {
      name: "Summer Radiance",
      img: summerImg,
      desc: "Warm hues with vibrant sun-kissed florals."
    },
    {
      name: "Autumn Essence",
      img: fallImg,
      desc: "Rich earthy colors capturing the spirit of fall."
    }
  ];

  return (
    <section className="featured-section">
      <div className="featured-container">

        <h2 className="featured-title">
          <div className="highlight"></div>
          Featured Bouquets</h2>
        <p className="featured-subtitle">
          <div className="highlight"></div>
          Seasonal arrangements crafted with elegance and artistic detail.
        </p>

        <div className="featured-grid">
          {bouquets.map((b, i) => (
            <div className="featured-card glass" key={i}>
              <img src={b.img} alt={b.name} className="featured-image" />

              <div className="featured-info">
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
                <button className="featured-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
