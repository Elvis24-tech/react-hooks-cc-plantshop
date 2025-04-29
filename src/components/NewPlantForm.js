import React, { useState } from 'react';

function PlantForm({ addPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.image || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price),
    };

    // Call the addPlant function from props
    addPlant(newPlant);

    // Reset form
    setFormData({
      name: '',
      image: '',
      price: ''
    });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="url"  // Changed to url type for better validation
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <button type="submit" className="primary">
          Add Plant
        </button>
      </form>
    </div>
  );
}

export default PlantForm;