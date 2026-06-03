import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getBookings, updateBookingStatus, deleteBooking } from '../../api';
import { FiTrash2 } from 'react-icons/fi';

const statusColors = { pending: '#f39c12', confirmed: '#27ae60', cancelled: '#e74c3c', completed: '#3498db' };

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { getBookings().then(r => setBookings(r.data)).finally(() => setLoading(false)); }, []);

  const handleStatus = async (id, status) => {
    const { data } = await updateBookingStatus(id, status);
    setBookings(b => b.map(x => x._id === id ? data : x));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return;
    await deleteBooking(id);
    setBookings(b => b.filter(x => x._id !== id));
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.8rem', marginBottom: '0.25rem' }}>Bookings</h1>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '2rem' }}>Manage all guest reservations</p>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: '0.4rem 1rem', border: '1px solid', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize', transition: 'all 0.2s', borderRadius: '20px',
                background: filter === s ? '#c9a96e' : 'transparent', borderColor: filter === s ? '#c9a96e' : 'rgba(201,169,110,0.3)', color: filter === s ? '#0f1923' : '#888' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f1923', border: '1px solid rgba(201,169,110,0.1)' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Loading...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                    {['Guest', 'Room', 'Dates', 'Guests', 'Total', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500 }}>{b.guestName}</p>
                        <p style={{ color: '#666', fontSize: '0.75rem' }}>{b.guestEmail}</p>
                        <p style={{ color: '#666', fontSize: '0.75rem' }}>{b.guestPhone}</p>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#aaa', fontSize: '0.875rem' }}>{b.room?.name || '—'}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>In: {new Date(b.checkIn).toLocaleDateString('en-IN')}</p>
                        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>Out: {new Date(b.checkOut).toLocaleDateString('en-IN')}</p>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#aaa', fontSize: '0.875rem' }}>{b.adults}A {b.children}C</td>
                      <td style={{ padding: '1rem 1.25rem', color: '#c9a96e', fontSize: '0.875rem', fontWeight: 600 }}>₹{b.totalPrice.toLocaleString()}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <select value={b.status} onChange={e => handleStatus(b._id, e.target.value)}
                          style={{ background: `${statusColors[b.status]}22`, color: statusColors[b.status], border: `1px solid ${statusColors[b.status]}44`, padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '4px' }}>
                          {['pending', 'confirmed', 'cancelled', 'completed'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => handleDelete(b._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>No bookings found</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
