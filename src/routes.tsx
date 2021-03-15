import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import BillsToPay from './pages/BillsToPay';
import DelayRule from './pages/DelayRule';
import Home from './pages/Home';


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Header />
        <Route path="/" exact component={Home}/>
        <Route path="/contas-a-pagar" exact component={BillsToPay}/>
        <Route path="/regras-de-atraso" exact component={DelayRule}/>
      </Switch>
    </BrowserRouter>
  );
}

export { Routes };