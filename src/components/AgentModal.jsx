import React from 'react';
import './AgentModal.css';
import { translations } from '../translations';

const AgentModal = ({ agent, onClose }) => {
  if (!agent) return null;

  const agentTranslation = translations.agents[agent.displayName];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <img src={agent.displayIcon} alt={`${agent.displayName} icon`} className="agent-image" />
        <h2>{agent.displayName}</h2>
        <p>{agentTranslation ? agentTranslation.description : agent.description}</p>
        {agent.role && (
          <div>
            <img src={agent.role.displayIcon} alt={`${agent.role.displayName} icon`} className="role-image" />
            <p>Rol: {agent.role.displayName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentModal;
