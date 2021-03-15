import React from 'react';

import './styles.scss';

const Header: React.FC = () => {
  return (
    <header>
      <h5 className="logo">Deliver IT</h5>
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">Contas a Pagar</a>
        <a href="#">Regras de Atraso</a>
      </nav>
    </header>
  );
}

export { Header };