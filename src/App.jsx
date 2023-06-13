import './App.css';
import Header from './components/Header/Header';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/products" element={<MainPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
