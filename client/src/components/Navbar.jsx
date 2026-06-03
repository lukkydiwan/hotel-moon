import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/amenities', label: 'Amenities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <nav
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: transparent ? 'transparent' : '#0f1923',
        borderBottom: transparent ? 'none' : '1px solid rgba(201,169,110,0.2)',
        transition: 'all 0.4s ease',
        padding: transparent ? '1.5rem 0' : '1rem 0',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#c9a96e', letterSpacing: '0.05em' }}>HOTEL</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 400, color: '#fff', letterSpacing: '0.35em' }}>MOON</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                color: isActive ? '#c9a96e' : '#e8e8e8',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.3s',
                borderBottom: isActive ? '1px solid #c9a96e' : '1px solid transparent',
                paddingBottom: '2px',
              })}
            >{l.label}</NavLink>
          ))}
          <Link to="/book" className="btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.75rem' }}>Book Now</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', color: '#c9a96e', fontSize: '1.5rem', cursor: 'pointer' }} className="mobile-menu-btn">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: '#0f1923', padding: '1rem 2rem 2rem', borderTop: '1px solid rgba(201,169,110,0.2)' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              style={({ isActive }) => ({
                display: 'block', padding: '0.75rem 0',
                color: isActive ? '#c9a96e' : '#e8e8e8',
                textDecoration: 'none', fontSize: '0.9rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              })}
            >{l.label}</NavLink>
          ))}
          <Link to="/book" className="btn-primary" style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}>Book Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
