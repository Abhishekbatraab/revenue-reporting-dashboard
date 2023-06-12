import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './app/history.js';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <Router history={history}>
      <AppRoutes />
    </Router>
  );
}

export default App;
