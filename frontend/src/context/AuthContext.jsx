import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const data = await authLogin(userData);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await authRegister(userData);
    setUser(data);
    return data;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
