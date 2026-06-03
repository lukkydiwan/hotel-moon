import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import { getRooms } from '../api';

const types = ['All', 'Standard', 'Deluxe', 'Suite', 'Presidential'];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = filter !== 'All' ? { type: filter } : {};
    getRooms(params).then(r => setRooms(r.data)).finally(() => setLoading(false));
  }, [filter]);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ background: '#0f1923', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Accommodations</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 600 }}>Rooms & Suites</h1>
          <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem auto 0' }} />
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '2.5rem 2rem', background: '#fff', borderBottom: '1px solid #f0ebe3' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{
                padding: '0.6rem 1.6rem', border: '2px solid', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, transition: 'all 0.3s',
                background: filter === t ? '#c9a96e' : 'transparent',
                borderColor: filter === t ? '#c9a96e' : '#ddd',
                color: filter === t ? '#0f1923' : '#666',
              }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms Grid */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>No rooms found.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {rooms.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <RoomCard room={r} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
