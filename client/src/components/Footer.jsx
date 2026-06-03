import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: '#0a1118', color: '#ccc', paddingTop: '4rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: '#c9a96e' }}>HOTEL</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#fff', letterSpacing: '0.35em' }}>MOON</div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#aaa', maxWidth: '280px' }}>
              A luxurious haven in the heart of Firozabad, offering world-class hospitality and an unforgettable experience.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a96e', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#0f1923'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
            {[['/', 'Home'], ['/rooms', 'Our Rooms'], ['/amenities', 'Amenities'], ['/gallery', 'Gallery'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
                — {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FiMapPin style={{ color: '#c9a96e', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.6 }}>Civil Lines, Near Bus Stand,<br />Firozabad, UP - 283203</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <FiPhone style={{ color: '#c9a96e', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#aaa' }}>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <FiMail style={{ color: '#c9a96e', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: '#aaa' }}>reservations@hotelmoon.in</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Hotel Hours</h4>
            {[['Check-In', '2:00 PM'], ['Check-Out', '12:00 PM'], ['Front Desk', '24/7'], ['Room Service', '24/7'], ['Restaurant', '7AM – 11PM']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#aaa' }}>{k}</span>
                <span style={{ color: '#c9a96e', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>© 2024 Hotel Moon, Firozabad. All rights reserved.</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Crafted with care for extraordinary stays.</p>
        </div>
      </div>
    </footer>
  );
}
