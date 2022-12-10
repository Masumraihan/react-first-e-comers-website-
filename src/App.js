import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Invertory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] =useState({})
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop></Shop>}> </Route>
          <Route path="/review" element={<Review></Review>}> </Route>
          <Route path="/manage" element={<Inventory></Inventory>}> </Route>
          {/*<PrivateRoute path="/shipment" element={<Shipment></Shipment>}> </PrivateRoute>*/}
          <Route path="/login" element={<Login></Login>}> </Route>
          <Route path="/" element={<Shop></Shop>}> </Route>
          <Route path="/product/:productKey" element={<ProductDetail></ProductDetail>}> </Route>
          <Route path="*" element={<NotFound></NotFound>}> </Route>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
