import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, getAdminMe } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      getAdminMe().then(r => setAdmin(r.data)).catch(() => localStorage.removeItem('adminToken')).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await adminLogin({ email, password });
    localStorage.setItem('adminToken', data.token);
    setAdmin({ email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
