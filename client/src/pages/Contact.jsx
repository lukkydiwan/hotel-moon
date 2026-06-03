import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';
import { sendContact } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendContact(form);
      setSuccess(true);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', background: '#fff', fontSize: '0.9rem', outline: 'none', color: '#2c2c2c', fontFamily: 'Inter, sans-serif' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.5rem' };

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ background: '#0f1923', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Get in Touch</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 600 }}>Contact Us</h1>
          <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem auto 0' }} />
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#0f1923', marginBottom: '0.5rem' }}>We'd Love to Hear From You</h2>
            <div style={{ width: '50px', height: '3px', background: '#c9a96e', marginBottom: '1.5rem' }} />
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Whether you have a question about our rooms, want to make a special arrangement, or just want to say hello — we're here for you.
            </p>

            {[
              { icon: FiMapPin, title: 'Address', lines: ['Civil Lines, Near Bus Stand,', 'Firozabad, Uttar Pradesh 283203'] },
              { icon: FiPhone, title: 'Phone', lines: ['+91 98765 43210', '+91 05612 234567'] },
              { icon: FiMail, title: 'Email', lines: ['reservations@hotelmoon.in', 'info@hotelmoon.in'] },
              { icon: FiClock, title: 'Front Desk', lines: ['Open 24 hours, 7 days a week'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ width: 44, height: 44, background: '#0f1923', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon color="#c9a96e" size={18} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>{title}</p>
                  {lines.map(l => <p key={l} style={{ color: '#444', fontSize: '0.9rem', lineHeight: 1.6 }}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {success ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#f3ede4' }}>
                <div style={{ width: 70, height: 70, background: '#c9a96e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <FiCheck color="#fff" size={30} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#0f1923', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ color: '#666' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className="btn-primary" style={{ marginTop: '1.5rem', border: 'none' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#0f1923', marginBottom: '1.5rem' }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Subject *</label>
                  <input name="subject" required value={form.subject} onChange={handleChange} style={inputStyle} placeholder="How can we help?" />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Your message..." />
                </div>
                {error && <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary" style={{ border: 'none', width: '100%' }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section style={{ height: '400px', background: '#1a2d3d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <FiMapPin size={40} color="#c9a96e" />
        <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Hotel Moon, Firozabad</p>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Civil Lines, Near Bus Stand, Firozabad UP 283203</p>
        <a href="https://maps.google.com/?q=Firozabad+Uttar+Pradesh" target="_blank" rel="noreferrer" className="btn-outline" style={{ marginTop: '0.5rem' }}>
          Open in Google Maps
        </a>
      </section>
    </div>
  );
}
