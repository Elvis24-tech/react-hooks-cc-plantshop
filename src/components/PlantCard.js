import React from 'react';

function PlantCard({ plant, toggleSoldOut }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price.toFixed(2)}</p>
      <p>{plant.soldOut ? 'Sold Out' : 'In Stock'}</p>
      <button 
        className={plant.soldOut ? '' : 'primary'}
        onClick={() => toggleSoldOut(plant.id)}
      >
        {plant.soldOut ? 'Mark In Stock' : 'Mark Sold Out'}
      </button>
    </div>
  );
}

export default PlantCard;