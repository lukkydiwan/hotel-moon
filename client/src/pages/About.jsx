import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiStar, FiUsers } from 'react-icons/fi';

const team = [
  { name: 'Rajiv Malhotra', role: 'General Manager', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
  { name: 'Sunita Verma', role: 'Head of Hospitality', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
  { name: 'Arjun Kapoor', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400' },
];

export default function About() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ background: '#0f1923', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Our Story</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 600 }}>About Hotel Moon</h1>
          <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem auto 0' }} />
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Since 2009</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#0f1923', marginBottom: '1.5rem', lineHeight: 1.2 }}>A Vision of Luxury<br />in Firozabad</h2>
            <div style={{ width: '60px', height: '3px', background: '#c9a96e', marginBottom: '1.5rem' }} />
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Hotel Moon was born from a simple dream — to bring world-class hospitality to the heart of Firozabad, a city celebrated globally for its extraordinary glass craftsmanship. Our founders believed that a city that creates such beauty deserved equally beautiful spaces to welcome its visitors.
            </p>
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Over the past 15 years, we have grown from a boutique property to Firozabad's most prestigious address. Every element of Hotel Moon — from our handpicked furnishings to our curated culinary experiences — reflects our obsession with detail and our deep respect for our guests.
            </p>
            <p style={{ color: '#666', lineHeight: 1.9, fontSize: '0.95rem' }}>
              Today, Hotel Moon stands as a testament to the belief that exceptional hospitality can flourish anywhere. We are proud to have hosted dignitaries, business leaders, and countless families who have made our hotel a cherished part of their story.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700" alt="Hotel Moon"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: '#c9a96e', padding: '1.5rem 2rem' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#0f1923', fontWeight: 700, lineHeight: 1 }}>15+</p>
              <p style={{ fontSize: '0.75rem', color: '#0f1923', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#f3ede4', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.5rem' }}>Our Values</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#0f1923' }}>What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { icon: FiHeart, title: 'Genuine Care', desc: 'Every guest is treated as family. We listen, anticipate, and go above and beyond.' },
              { icon: FiStar, title: 'Excellence', desc: 'From the thread count to the temperature of your coffee, we sweat the details.' },
              { icon: FiAward, title: 'Integrity', desc: 'Honest pricing, transparent policies, and promises we keep. Always.' },
              { icon: FiUsers, title: 'Community', desc: 'We are proud members of Firozabad, and we give back to the community we serve.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ background: '#fff', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={24} color="#c9a96e" />
                </div>
                <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#0f1923', marginBottom: '0.75rem' }}>{title}</h4>
                <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.5rem' }}>The People Behind the Magic</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#0f1923' }}>Meet Our Team</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {team.map(m => (
            <div key={m.name} style={{ textAlign: 'center' }}>
              <img src={m.img} alt={m.name} style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #c9a96e', margin: '0 auto 1.25rem', display: 'block' }} />
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: '#0f1923', marginBottom: '0.3rem' }}>{m.name}</h4>
              <p style={{ fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0f1923', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Ready to Experience Hotel Moon?</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>Join thousands of guests who have made Hotel Moon their home away from home.</p>
        <Link to="/book" className="btn-primary">Book Your Stay</Link>
      </section>
    </div>
  );
}
