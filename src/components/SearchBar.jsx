import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery, onKeyDown }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim() === '') {
        setShowAlert(true);
      } else {
        setShowAlert(false);
        onKeyDown(); // Call the onKeyDown handler passed from parent component
      }
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar un agente ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {showAlert && (
        <div className="alert-overlay" onClick={closeAlert}>
          <div className="alert-box" onClick={(e) => e.stopPropagation()}>
            <p>Por favor, escribe algo en la barra de búsqueda antes de presionar Enter.</p>
            <button onClick={closeAlert}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
