import logo from './logo.svg';
import './App.css';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
