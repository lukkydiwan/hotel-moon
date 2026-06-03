import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const images = [
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', cat: 'Exterior', title: 'Hotel Facade' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', cat: 'Rooms', title: 'Deluxe Room' },
  { src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', cat: 'Rooms', title: 'Suite Bedroom' },
  { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', cat: 'Rooms', title: 'Presidential Suite' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', cat: 'Pool', title: 'Infinity Pool' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', cat: 'Exterior', title: 'Pool View' },
  { src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', cat: 'Rooms', title: 'Lunar Suite' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', cat: 'Rooms', title: 'Deluxe Bath' },
  { src: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800', cat: 'Dining', title: 'Restaurant View' },
  { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800', cat: 'Rooms', title: 'Starlight Room' },
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', cat: 'Rooms', title: 'Standard Room' },
  { src: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800', cat: 'Rooms', title: 'Suite Living Area' },
];

const cats = ['All', 'Rooms', 'Exterior', 'Pool', 'Dining'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? images : images.filter(i => i.cat === filter);

  const prev = () => setLightbox(l => (l - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(l => (l + 1) % filtered.length);

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ background: '#0f1923', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Visual Tour</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 600 }}>Photo Gallery</h1>
          <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem auto 0' }} />
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '2rem', background: '#fff', borderBottom: '1px solid #f0ebe3' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ padding: '0.5rem 1.4rem', border: '2px solid', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, transition: 'all 0.3s', background: filter === c ? '#c9a96e' : 'transparent', borderColor: filter === c ? '#c9a96e' : '#ddd', color: filter === c ? '#0f1923' : '#666' }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '3rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ columns: '3 280px', gap: '1rem' }}>
          {filtered.map((img, i) => (
            <motion.div key={img.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              style={{ breakInside: 'avoid', marginBottom: '1rem', overflow: 'hidden', cursor: 'pointer', position: 'relative', display: 'block' }}
              onClick={() => setLightbox(i)}>
              <img src={img.src} alt={img.title} style={{ width: '100%', display: 'block', transition: 'transform 0.4s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(15,25,35,0.8))', padding: '1.5rem 1rem 0.75rem', opacity: 0, transition: 'opacity 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <p style={{ color: '#fff', fontSize: '0.875rem', fontFamily: 'Playfair Display, serif' }}>{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightbox(null)}>
            <button onClick={e => { e.stopPropagation(); prev(); }}
              style={{ position: 'absolute', left: '1.5rem', background: 'none', border: 'none', color: '#c9a96e', cursor: 'pointer', fontSize: '2rem' }}>
              <FiChevronLeft />
            </button>
            <img src={filtered[lightbox]?.src} alt="" onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} />
            <button onClick={e => { e.stopPropagation(); next(); }}
              style={{ position: 'absolute', right: '1.5rem', background: 'none', border: 'none', color: '#c9a96e', cursor: 'pointer', fontSize: '2rem' }}>
              <FiChevronRight />
            </button>
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.5rem' }}>
              <FiX />
            </button>
            <p style={{ position: 'absolute', bottom: '1.5rem', color: '#c9a96e', fontFamily: 'Playfair Display, serif' }}>
              {filtered[lightbox]?.title} — {lightbox + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
