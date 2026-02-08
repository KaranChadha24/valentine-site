import React from 'react';
import favouritesData from '../../data/favouritesData';
import './Favourites.css';

export default function Favourites() {
  return (
    <div className="favourites">
      <h2>My Favourite Things About You</h2>
      <div className="favourites-grid">
        {favouritesData.map((item, index) => (
          <div key={index} className="favourite-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
