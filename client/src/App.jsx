import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Booking from './pages/Booking';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminRooms from './pages/admin/AdminRooms';
import AdminMessages from './pages/admin/Messages';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a1118', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a96e', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>
      Loading...
    </div>
  );
  return admin ? children : <Navigate to="/admin" replace />;
}

function PublicLayout({ children }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return isAdmin ? children : (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/rooms" element={<ProtectedRoute><AdminRooms /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
      </Routes>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
