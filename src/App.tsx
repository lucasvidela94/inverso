import { Router, Route } from '@solidjs/router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explorar from './pages/Explorar';
import Aprender from './pages/Aprender';
import Brokers from './pages/Brokers';
import Detalle from './pages/Detalle';

export default function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/explorar" component={Explorar} />
      <Route path="/aprender" component={Aprender} />
      <Route path="/brokers" component={Brokers} />
      <Route path="/inversion/:ticker" component={Detalle} />
    </Router>
  );
}
