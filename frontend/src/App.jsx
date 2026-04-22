import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/layout/SmoothScroll';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnnouncementBar from './components/ui/AnnouncementBar';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Collections from './pages/Collections';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="flex flex-col min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow pt-24 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
