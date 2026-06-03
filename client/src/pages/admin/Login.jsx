import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a1118', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#c9a96e' }}>HOTEL</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#fff', letterSpacing: '0.35em' }}>MOON</div>
          <p style={{ color: '#888', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.5rem' }}>Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#0f1923', padding: '2.5rem', border: '1px solid rgba(201,169,110,0.2)' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Sign In</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', background: '#1a2d3d', border: '1px solid rgba(201,169,110,0.2)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', background: '#1a2d3d', border: '1px solid rgba(201,169,110,0.2)', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
          </div>

          {error && <p style={{ color: '#e74c3c', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', border: 'none', padding: '0.875rem' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
