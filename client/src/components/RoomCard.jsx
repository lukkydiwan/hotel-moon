import { Link } from 'react-router-dom';
import { FiUsers, FiMaximize2, FiArrowRight } from 'react-icons/fi';

export default function RoomCard({ room }) {
  return (
    <div style={{
      background: '#fff',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      overflow: 'hidden',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img src={room.images[0]} alt={room.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#0f1923', color: '#c9a96e', padding: '0.3rem 0.8rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {room.type}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#0f1923', marginBottom: '0.5rem' }}>{room.name}</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {room.description}
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#888' }}>
            <FiUsers style={{ color: '#c9a96e' }} /> {room.capacity} Guests
          </div>
          {room.size && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#888' }}>
              <FiMaximize2 style={{ color: '#c9a96e' }} /> {room.size}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f0ebe3' }}>
          <div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#0f1923', fontWeight: 600 }}>₹{room.price.toLocaleString()}</span>
            <span style={{ fontSize: '0.8rem', color: '#999' }}>/night</span>
          </div>
          <Link to={`/rooms/${room._id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c9a96e', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
