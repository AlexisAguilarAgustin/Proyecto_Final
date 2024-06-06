// src/components/AgentsList.jsx
import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../api';
import './AgentsList.css';
import SearchBar from './SearchBar';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getAgents = async () => {
      const agentsData = await fetchAgents();
      setAgents(agentsData);
      setLoading(false);
    };

    getAgents();
  }, []);

  const filteredAgents = agents.filter(agent =>
    agent.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Valorant Agents</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid-container">
        {filteredAgents.map(agent => (
          <div key={agent.uuid} className="grid-item">
            <img src={agent.displayIcon} alt={`${agent.displayName} icon`} className="agent-image" />
            <h2>{agent.displayName}</h2>
            <p>{agent.description}</p>
            {agent.role && (
              <div>
                <img src={agent.role.displayIcon} alt={`${agent.role.displayName} icon`} className="role-image" />
                <p>Role: {agent.role.displayName}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsList;