import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../UserContext';

export default function HomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(name);
    navigate('/main-menu', { state: { name } });
  };

  return (
    <div className="container-center">
      <p className="title gradient-text">Serpent Duel</p>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit" className="button-default button-height-less">JOIN</button>
      </form>
    </div>
  );
}
