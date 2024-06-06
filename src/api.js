// src/api.js
export const fetchAgents = async () => {
  const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
  const data = await response.json();
  return data.data;
};