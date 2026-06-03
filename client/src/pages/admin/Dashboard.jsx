import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getBookingStats, getBookings } from '../../api';
import { FiCalendar, FiCheckCircle, FiXCircle, FiDollarSign, FiClock } from 'react-icons/fi';

const statusColors = { pending: '#f39c12', confirmed: '#27ae60', cancelled: '#e74c3c', completed: '#3498db' };

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getBookingStats().then(r => setStats(r.data));
    getBookings().then(r => setRecent(r.data.slice(0, 5)));
  }, []);

  const cards = stats ? [
    { label: 'Total Bookings', value: stats.total, icon: FiCalendar, color: '#c9a96e' },
    { label: 'Pending', value: stats.pending, icon: FiClock, color: '#f39c12' },
    { label: 'Confirmed', value: stats.confirmed, icon: FiCheckCircle, color: '#27ae60' },
    { label: 'Total Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: FiDollarSign, color: '#3498db' },
  ] : [];

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.8rem' }}>Dashboard</h1>
          <p style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.25rem' }}>Welcome back to Hotel Moon Admin</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{ background: '#0f1923', padding: '1.5rem', border: '1px solid rgba(201,169,110,0.1)', borderTop: `3px solid ${color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#fff', fontWeight: 600 }}>{value ?? '—'}</p>
                </div>
                <Icon size={24} color={color} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div style={{ background: '#0f1923', border: '1px solid rgba(201,169,110,0.1)' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(201,169,110,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.1rem' }}>Recent Bookings</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                  {['Guest', 'Room', 'Check-In', 'Check-Out', 'Amount', 'Status'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(b => (
                  <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500 }}>{b.guestName}</p>
                      <p style={{ color: '#666', fontSize: '0.8rem' }}>{b.guestEmail}</p>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#aaa', fontSize: '0.875rem' }}>{b.room?.name || '—'}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#aaa', fontSize: '0.875rem' }}>{new Date(b.checkIn).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#aaa', fontSize: '0.875rem' }}>{new Date(b.checkOut).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#c9a96e', fontSize: '0.875rem', fontWeight: 600 }}>₹{b.totalPrice.toLocaleString()}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ background: `${statusColors[b.status]}22`, color: statusColors[b.status], padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, borderRadius: '20px', textTransform: 'capitalize' }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>No bookings yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
