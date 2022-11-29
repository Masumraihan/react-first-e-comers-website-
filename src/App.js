import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Invertory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop></Shop>}> </Route>
          <Route path="/review" element={<Review></Review>}> </Route>
          <Route path="/manage" element={<Inventory></Inventory>}> </Route>
          <Route path="/" element={<Shop></Shop>}> </Route>
          <Route path="/product/:productKey" element={<ProductDetail></ProductDetail>}> </Route>
          <Route path="*" element={<NotFound></NotFound>}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
