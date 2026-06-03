import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiCalendar, FiMessageSquare, FiHome, FiLogOut, FiList } from 'react-icons/fi';

const nav = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/bookings', icon: FiCalendar, label: 'Bookings' },
  { to: '/admin/rooms', icon: FiList, label: 'Rooms' },
  { to: '/admin/messages', icon: FiMessageSquare, label: 'Messages' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a1118' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#0f1923', borderRight: '1px solid rgba(201,169,110,0.15)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: '#c9a96e' }}>HOTEL MOON</div>
          <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.875rem 1.5rem', textDecoration: 'none',
                color: isActive ? '#c9a96e' : '#888',
                background: isActive ? 'rgba(201,169,110,0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid #c9a96e' : '3px solid transparent',
                fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s',
              })}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.5rem', color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>
            <FiHome size={16} /> View Website
          </a>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.5rem', color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', background: '#0d1b24' }}>
        {children}
      </main>
    </div>
  );
}
