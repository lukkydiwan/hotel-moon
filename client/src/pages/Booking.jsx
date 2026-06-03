import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getRooms, createBooking } from '../api';
import { FiCheck } from 'react-icons/fi';

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const preselected = params.get('room');

  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ roomId: preselected || '', guestName: '', guestEmail: '', guestPhone: '', adults: 1, children: 0, specialRequests: '' });
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getRooms({ available: true }).then(r => setRooms(r.data));
  }, []);

  const selectedRoom = rooms.find(r => r._id === form.roomId);
  const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!checkIn || !checkOut) return setError('Please select check-in and check-out dates.');
    if (nights < 1) return setError('Check-out must be after check-in.');
    setLoading(true);
    setError('');
    try {
      await createBooking({ ...form, checkIn, checkOut });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ paddingTop: '80px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ width: 80, height: 80, background: '#c9a96e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <FiCheck color="#fff" size={36} />
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#0f1923', marginBottom: '1rem' }}>Booking Confirmed!</h2>
        <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '2rem' }}>Thank you for choosing Hotel Moon. Your reservation is pending confirmation. We'll reach out to you shortly.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Return to Home</button>
      </div>
    </div>
  );

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', background: '#fff', fontSize: '0.9rem', outline: 'none', color: '#2c2c2c', fontFamily: 'Inter, sans-serif' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.5rem' };

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ background: '#0f1923', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Reservation</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>Book Your Stay</h1>
      </section>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#0f1923', marginBottom: '1.5rem' }}>Guest Information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input name="guestName" required value={form.guestName} onChange={handleChange} style={inputStyle} placeholder="Your full name" />
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input name="guestPhone" required value={form.guestPhone} onChange={handleChange} style={inputStyle} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Email Address *</label>
              <input name="guestEmail" type="email" required value={form.guestEmail} onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Room *</label>
              <select name="roomId" required value={form.roomId} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Select a room</option>
                {rooms.map(r => <option key={r._id} value={r._id}>{r.name} — ₹{r.price.toLocaleString()}/night</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Check-In *</label>
                <DatePicker selected={checkIn} onChange={setCheckIn} minDate={new Date()} placeholderText="Select date"
                  customInput={<input style={inputStyle} />} dateFormat="dd MMM yyyy" />
              </div>
              <div>
                <label style={labelStyle}>Check-Out *</label>
                <DatePicker selected={checkOut} onChange={setCheckOut} minDate={checkIn || new Date()} placeholderText="Select date"
                  customInput={<input style={inputStyle} />} dateFormat="dd MMM yyyy" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Adults</label>
                <select name="adults" value={form.adults} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Children</label>
                <select name="children" value={form.children} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                  {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Special Requests</label>
              <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Any special requests or preferences..." />
            </div>

            {error && <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', border: 'none', fontSize: '0.9rem' }}>
              {loading ? 'Processing...' : 'Confirm Reservation'}
            </button>
          </form>

          {/* Summary */}
          <div style={{ background: '#0f1923', padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.3rem', marginBottom: '1.5rem' }}>Booking Summary</h3>
            {selectedRoom ? (
              <>
                <img src={selectedRoom.images[0]} alt="" style={{ width: '100%', height: '160px', objectFit: 'cover', marginBottom: '1rem' }} />
                <p style={{ color: '#c9a96e', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{selectedRoom.type}</p>
                <p style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>{selectedRoom.name}</p>
              </>
            ) : (
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Select a room to see summary</p>
            )}
            <div style={{ borderTop: '1px solid rgba(201,169,110,0.2)', paddingTop: '1rem' }}>
              {[['Check-In', checkIn?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || '—'],
                ['Check-Out', checkOut?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || '—'],
                ['Nights', nights || '—'],
                ['Rate/Night', selectedRoom ? `₹${selectedRoom.price.toLocaleString()}` : '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                  <span style={{ color: '#888' }}>{k}</span>
                  <span style={{ color: '#ddd' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(201,169,110,0.2)', marginTop: '0.25rem' }}>
                <span style={{ color: '#c9a96e', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Total</span>
                <span style={{ fontFamily: 'Playfair Display, serif', color: '#c9a96e', fontSize: '1.4rem', fontWeight: 600 }}>
                  {totalPrice > 0 ? `₹${totalPrice.toLocaleString()}` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
