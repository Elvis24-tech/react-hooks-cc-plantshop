import React, { useState, useEffect } from 'react';
import PlantList from './PlantList';
import PlantForm from './NewPlantForm';
import SearchBar from './Search';
import Header from './Header';
import '../App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all plants on component mount
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:6001/plants');
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure data is an array before mapping
        if (!Array.isArray(data)) {
          throw new Error('Received invalid data format from server');
        }
        
        setPlants(data.map((plant) => ({ 
          ...plant, 
          soldOut: plant.soldOut || false 
        })));
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setPlants([]); // Reset plants to empty array
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Add a new plant
  const addPlant = async (newPlant) => {
    const tempId = Date.now();
    
    try {
      // Optimistic UI update
      setPlants(prev => [...prev, { ...newPlant, id: tempId, soldOut: false }]);

      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlant),
      });

      if (!response.ok) {
        throw new Error(`Failed to add plant: ${response.status}`);
      }

      const serverPlant = await response.json();
      setPlants(prev => prev.map(p => p.id === tempId ? serverPlant : p));
    } catch (err) {
      console.error('Add plant error:', err);
      setPlants(prev => prev.filter(p => p.id !== tempId));
      alert(err.message);
    }
  };

  // Toggle sold out status
  const toggleSoldOut = (id) => {
    setPlants(prev => prev.map(p => 
      p.id === id ? { ...p, soldOut: !p.soldOut } : p
    ));
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="app">
        <Header />
        <div className="loading-message">Loading plants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="error-message">
          <h2>Error Loading Plants</h2>
          <p>{error}</p>
          <p>Please check:
            <ol>
              <li>Your JSON server is running: <code>json-server --watch db.json --port 6001</code></li>
              <li>The server returns data at <a href="http://localhost:6001/plants" target="_blank" rel="noopener noreferrer">http://localhost:6001/plants</a></li>
              <li>Your db.json file contains valid plant data</li>
            </ol>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantForm addPlant={addPlant} />
      
      {filteredPlants.length > 0 ? (
        <PlantList plants={filteredPlants} toggleSoldOut={toggleSoldOut} />
      ) : (
        <div className="no-plants-message">
          {searchTerm ? (
            <p>No plants match your search for "{searchTerm}"</p>
          ) : (
            <p>No plants available. Please add some plants!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;