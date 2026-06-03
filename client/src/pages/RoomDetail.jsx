import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiUsers, FiMaximize2, FiCheck, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getRoom } from '../api';

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoom(id).then(r => setRoom(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ paddingTop: '120px', textAlign: 'center', color: '#888', minHeight: '60vh' }}>Loading...</div>;
  if (!room) return <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '60vh' }}>Room not found.</div>;

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Image Gallery */}
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden', background: '#000' }}>
        <img src={room.images[imgIdx]} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        {room.images.length > 1 && (
          <>
            <button onClick={() => setImgIdx(i => (i - 1 + room.images.length) % room.images.length)}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(15,25,35,0.7)', border: 'none', color: '#c9a96e', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiChevronLeft size={22} />
            </button>
            <button onClick={() => setImgIdx(i => (i + 1) % room.images.length)}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(15,25,35,0.7)', border: 'none', color: '#c9a96e', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiChevronRight size={22} />
            </button>
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
              {room.images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? '#c9a96e' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
        {/* Main Content */}
        <div>
          <Link to="/rooms" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#888', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <FiArrowLeft /> Back to Rooms
          </Link>
          <div style={{ display: 'inline-block', background: '#0f1923', color: '#c9a96e', padding: '0.3rem 0.8rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            {room.type}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#0f1923', marginBottom: '1rem' }}>{room.name}</h1>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
              <FiUsers color="#c9a96e" /> Up to {room.capacity} guests
            </div>
            {room.size && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
              <FiMaximize2 color="#c9a96e" /> {room.size}
            </div>}
          </div>
          <p style={{ color: '#555', lineHeight: 1.9, fontSize: '1rem', marginBottom: '2.5rem' }}>{room.description}</p>

          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#0f1923', marginBottom: '1.5rem' }}>Room Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {room.amenities.map(a => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#555' }}>
                <FiCheck color="#c9a96e" size={16} /> {a}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div style={{ background: '#0f1923', padding: '2rem', position: 'sticky', top: '100px' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
            <p style={{ color: '#888', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Starting From</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#c9a96e', fontWeight: 600 }}>₹{room.price.toLocaleString()}</span>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>/ night</span>
            </div>
          </div>
          <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Includes complimentary breakfast, Wi-Fi, and access to all hotel facilities.
          </p>
          <Link to={`/book?room=${room._id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: '1rem' }}>
            Book This Room
          </Link>
          <p style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center' }}>Free cancellation · No prepayment needed</p>
        </div>
      </div>

      <style>{`@media(max-width:900px){ .detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
