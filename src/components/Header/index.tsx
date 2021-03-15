import { Link } from 'react-router-dom';

import './styles.scss';

const Header: React.FC = () => {
  return (
    <header>
      <h5 className="logo">Deliver IT</h5>
      <nav className="navbar">
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/contas-a-pagar">Contas a Pagar</Link>
        <Link className="navlink" to="/regras-de-atraso">Regras de Atraso</Link>
      </nav>
    </header>
  );
}

export { Header };