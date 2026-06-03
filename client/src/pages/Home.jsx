import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiWifi, FiCoffee, FiStar, FiArrowRight, FiPhone, FiShield, FiDroplet } from 'react-icons/fi';
import { MdPool, MdSpa, MdRestaurant, MdFitnessCenter } from 'react-icons/md';
import RoomCard from '../components/RoomCard';
import { getFeaturedRooms } from '../api';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const testimonials = [
  { name: 'Priya Sharma', city: 'Delhi', text: 'An absolutely wonderful experience. The staff was incredibly attentive and the room was immaculate. Hotel Moon exceeded all our expectations!', stars: 5 },
  { name: 'Rahul Mehta', city: 'Mumbai', text: 'The Presidential Suite was breathtaking. From the panoramic views to the butler service — every detail screamed luxury. Will definitely return.', stars: 5 },
  { name: 'Anjali Gupta', city: 'Agra', text: 'Perfect for our anniversary getaway. Beautifully decorated, excellent food, and a team that truly cares about your comfort. Highly recommended!', stars: 5 },
];

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getFeaturedRooms().then(r => setRooms(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,25,35,0.3) 0%, rgba(15,25,35,0.7) 100%)' }} />

        <div style={{ position: 'relative', textAlign: 'center', color: '#fff', padding: '0 1.5rem', maxWidth: '900px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '0.8rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '1rem' }}>
            Welcome to Firozabad's Finest
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Where Luxury<br /><span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Meets the Moon</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontSize: '1.1rem', color: '#ddd', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Experience unparalleled elegance and warmth in the heart of Firozabad. Every stay is crafted to be an extraordinary memory.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn-primary">Reserve Your Stay</Link>
            <Link to="/rooms" className="btn-outline">Explore Rooms</Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a96e, transparent)' }} />
        </div>
      </section>

      {/* Quick Info Bar */}
      <section style={{ background: '#0f1923', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          {[['Check-In', '2:00 PM'], ['Check-Out', '12:00 PM'], ['Reception', '24 / 7'], ['Call Us', '+91 98765 43210']].map(([k, v]) => (
            <div key={k} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{k}</div>
              <div style={{ color: '#c9a96e', fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Intro */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="section-subtitle">Our Story</p>
            <h2 className="section-title">A Legacy of<br />Gracious Hospitality</h2>
            <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem 0' }} />
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Nestled in the vibrant city of Firozabad — India's glass and bangle capital — Hotel Moon stands as a beacon of contemporary luxury and timeless elegance. Since our founding, we have been dedicated to crafting experiences that transcend the ordinary.
            </p>
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Our philosophy is simple: every guest deserves to feel like royalty. From meticulously designed suites to personalized service that anticipates your every need, we bring world-class hospitality to the heart of Uttar Pradesh.
            </p>
            <Link to="/about" className="btn-dark">Discover Our Story</Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700" alt="Hotel Moon Lobby"
              style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: '#0f1923', padding: '1.5rem 2rem', display: 'flex', gap: '2rem' }}>
              {[['15+', 'Years'], ['50+', 'Rooms'], ['10K+', 'Guests']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#c9a96e', fontWeight: 700 }}>{n}</div>
                  <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section style={{ background: '#f3ede4', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="section-subtitle">Accommodations</p>
            <h2 className="section-title">Featured Rooms & Suites</h2>
            <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.25rem auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {rooms.map(r => <RoomCard key={r._id} room={r} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/rooms" className="btn-primary">View All Rooms</Link>
          </div>
        </div>
      </section>

      {/* Amenities Strip */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-subtitle">World-Class Facilities</p>
          <h2 className="section-title">Everything You Need</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
          {[
            { icon: MdPool, label: 'Swimming Pool' },
            { icon: MdRestaurant, label: 'Fine Dining' },
            { icon: MdSpa, label: 'Luxury Spa' },
            { icon: MdFitnessCenter, label: 'Fitness Center' },
            { icon: FiWifi, label: 'Free Wi-Fi' },
            { icon: FiShield, label: '24/7 Security' },
          ].map(({ icon: Icon, label }) => (
            <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ textAlign: 'center', padding: '2rem 1rem', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0f1923'; e.currentTarget.querySelector('.icon-wrap').style.background = 'rgba(201,169,110,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelector('.icon-wrap').style.background = 'rgba(201,169,110,0.1)'; }}
            >
              <div className="icon-wrap" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Icon size={24} color="#c9a96e" />
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'inherit', letterSpacing: '0.05em' }}>{label}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/amenities" className="btn-outline">All Amenities</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#0f1923', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.5rem' }}>Guest Reviews</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#fff' }}>What Our Guests Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ background: '#1a2d3d', padding: '2rem', borderTop: '3px solid #c9a96e' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>
                  {[...Array(t.stars)].map((_, s) => <FiStar key={s} color="#c9a96e" fill="#c9a96e" size={16} />)}
                </div>
                <p style={{ color: '#bbb', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div>
                  <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>{t.name}</p>
                  <p style={{ color: '#888', fontSize: '0.8rem' }}>{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: '7rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
        <div style={{ position: 'relative' }}>
          <p className="section-subtitle">Limited Availability</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>Begin Your Extraordinary Stay</h2>
          <p style={{ color: '#ccc', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>Reserve your room today and let Hotel Moon redefine your definition of luxury hospitality.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn-primary">Book Now</Link>
            <a href="tel:+919876543210" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiPhone /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
