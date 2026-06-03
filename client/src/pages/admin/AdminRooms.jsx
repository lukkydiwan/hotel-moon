import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getRooms, updateRoom, deleteRoom } from '../../api';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getRooms().then(r => setRooms(r.data)).finally(() => setLoading(false)); }, []);

  const handleToggle = async (id, field, val) => {
    const { data } = await updateRoom(id, { [field]: val });
    setRooms(r => r.map(x => x._id === id ? data : x));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this room?')) return;
    await deleteRoom(id);
    setRooms(r => r.filter(x => x._id !== id));
  };

  const handleSave = async () => {
    const { data } = await updateRoom(editing._id, { price: Number(editing.price), available: editing.available });
    setRooms(r => r.map(x => x._id === editing._id ? data : x));
    setEditing(null);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.8rem', marginBottom: '0.25rem' }}>Rooms</h1>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '2rem' }}>Manage room inventory and availability</p>

        <div style={{ background: '#0f1923', border: '1px solid rgba(201,169,110,0.1)' }}>
          {loading ? <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Loading...</div> : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                    {['Room', 'Type', 'Price/Night', 'Capacity', 'Status', 'Featured', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(r => (
                    <tr key={r._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={r.images[0]} alt="" style={{ width: 52, height: 40, objectFit: 'cover' }} />
                          <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500 }}>{r.name}</p>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{ background: 'rgba(201,169,110,0.1)', color: '#c9a96e', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderRadius: '3px' }}>{r.type}</span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {editing?._id === r._id ? (
                          <input value={editing.price} onChange={e => setEditing(x => ({ ...x, price: e.target.value }))}
                            style={{ background: '#1a2d3d', border: '1px solid rgba(201,169,110,0.3)', color: '#fff', padding: '0.3rem 0.6rem', width: '90px', fontSize: '0.875rem' }} />
                        ) : (
                          <span style={{ color: '#c9a96e', fontWeight: 600 }}>₹{r.price.toLocaleString()}</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: '#aaa', fontSize: '0.875rem' }}>{r.capacity}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => handleToggle(r._id, 'available', !r.available)}
                          style={{ background: r.available ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', color: r.available ? '#27ae60' : '#e74c3c', border: 'none', padding: '0.25rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '20px', fontWeight: 600 }}>
                          {r.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => handleToggle(r._id, 'featured', !r.featured)}
                          style={{ background: r.featured ? 'rgba(201,169,110,0.15)' : 'transparent', color: r.featured ? '#c9a96e' : '#666', border: `1px solid ${r.featured ? '#c9a96e' : '#444'}`, padding: '0.25rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '20px', fontWeight: 600 }}>
                          {r.featured ? '★ Featured' : 'Not Featured'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {editing?._id === r._id ? (
                            <>
                              <button onClick={handleSave} style={{ background: 'none', border: 'none', color: '#27ae60', cursor: 'pointer' }}><FiCheck size={16} /></button>
                              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><FiX size={16} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setEditing({ ...r })} style={{ background: 'none', border: 'none', color: '#c9a96e', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                              <button onClick={() => handleDelete(r._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
