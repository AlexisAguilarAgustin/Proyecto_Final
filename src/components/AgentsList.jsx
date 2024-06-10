import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../api';
import './AgentsList.css';
import SearchBar from './SearchBar';
import AgentModal from './AgentModal';
import valorantLogo from '../assets/valorantLogo.png';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const agentsPerPage = 5;

  useEffect(() => {
    const getAgents = async () => {
      const agentsData = await fetchAgents();
      setAgents(agentsData);
      setLoading(false);
    };

    getAgents();
  }, []);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem('valorantSearchQuery');
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('valorantSearchQuery', searchQuery);
  }, [searchQuery]);

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetear la paginación a la primera página al cambiar la búsqueda
  };

  // Función para manejar la paginación
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtrar agentes basados en la búsqueda
  const filteredAgents = agents.filter(agent =>
    agent.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular índices para la paginación
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;

  // Obtener los agentes actuales basados en la paginación y la búsqueda
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

  const handleAgentClick = agent => {
    setSelectedAgent(agent);
  };

  const closeModal = () => {
    setSelectedAgent(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <img src={valorantLogo} alt="Valorant logo" className="valorant-logo" />
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
      <div className="grid-container">
        {currentAgents.length > 0 ? (
          currentAgents.map(agent => (
            <div key={agent.uuid} className="grid-item" onClick={() => handleAgentClick(agent)}>
              <img src={agent.displayIcon} alt={`${agent.displayName} icon`} className="agent-image" />
              <h2>{agent.displayName}</h2>
              {agent.role && (
                <div>
                  <img src={agent.role.displayIcon} alt={`${agent.role.displayName} icon`} className="role-image" />
                  <p>Rol: {agent.role.displayName}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', margin: '20px' }}>
            <p>No se encontraron agentes que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredAgents.length / agentsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
      <AgentModal agent={selectedAgent} onClose={closeModal} />
    </div>
  );
};

export default AgentsList;
