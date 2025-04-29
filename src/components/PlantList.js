import React from 'react';
import PlantCard from './PlantCard';

function PlantList({ plants, toggleSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard plant={plant} toggleSoldOut={toggleSoldOut} />
        </li>
      ))}
    </ul>
  );
}

export default PlantList;