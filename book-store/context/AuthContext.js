import { createContext, useState, useContext, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Session in AuthProvider:', session);
    if (session) {
      setUser({
        id: session.id, // Ensure `id` exists in the session
        email: session.user.email,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (credentials) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (res?.error) {
      console.error(res.error);
    }
  };

  const logout = () => {
    signOut({ redirect: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
