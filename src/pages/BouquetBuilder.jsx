import { useState } from "react";
import "../styles/BouquetBuilder.css"; 

export default function BouquetBuilder() {
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [note, setNote] = useState("");

  const flowers = [
    { name: "Rose", price: 5 },
    { name: "Tulip", price: 3 },
    { name: "Lily", price: 4 },
    { name: "Sunflower", price: 6 }
  ];

  function addFlower(flower) {
    setSelectedFlowers([...selectedFlowers, flower]);
  }

  function removeFlower(index) {
    const updated = [...selectedFlowers];
    updated.splice(index, 1);
    setSelectedFlowers(updated);
  }

  const totalPrice = selectedFlowers.reduce((sum, f) => sum + f.price, 0);

  return (
    <div className="bouquet-page">
      <div className="bouquet-container">
        <h2>Create Your Bouquet</h2>

        <div className="flower-list">
          {flowers.map((flower, i) => (
            <button key={i} className="flower-btn" onClick={() => addFlower(flower)}>
              {flower.name} (${flower.price})
            </button>
          ))}   
        </div>

        <div className="selected-box">
          <h3>Your Bouquet</h3>
          {selectedFlowers.length === 0 && <p>No flowers selected yet.</p>}

          <ul>
            {selectedFlowers.map((f, i) => (
              <li key={i}>
                {f.name} - ${f.price}
                <button onClick={() => removeFlower(i)} className="remove-btn">remove</button>
              </li>
            ))}
          </ul>

          <p className="total">Total: ${totalPrice}</p>

          <textarea
            className="note-box"
            placeholder="Write a special note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

