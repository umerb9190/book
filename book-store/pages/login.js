import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    router.push('/'); // Redirect to homepage after successful login
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #3b82f6, #9333ea)', // Blue to Purple gradient
  };

  const formStyle = {
    background: 'linear-gradient(to right, #1e3a8a, #6b21a8)', // Dark Blue to Purple gradient
    padding: '2.5rem',
    borderRadius: '1.5rem',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  };

  const formHoverStyle = {
    transform: 'scale(1.05)',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'white',
    letterSpacing: '2px',
  };

  const labelStyle = {
    fontSize: '1.125rem',
    color: 'white',
    fontWeight: 600,
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: 'none',
    borderRadius: '1.25rem',
    background: 'rgba(59, 130, 246, 0.2)', // Semi-transparent blue
    color: '#333',
    fontSize: '1.125rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const inputFocusStyle = {
    background: 'rgba(59, 130, 246, 0.3)',
    border: '2px solid #3b82f6',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.25rem',
    background: 'linear-gradient(to right, #3b82f6, #9333ea)', // Blue to Purple gradient
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '1.25rem',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
  };

  const buttonHoverStyle = {
    background: 'linear-gradient(to right, #9333ea, #3b82f6)', // Reverse gradient on hover
    transform: 'scale(1.05)',
  };

  const buttonFocusStyle = {
    outline: 'none',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
  };

  return (
    <div style={containerStyle}>
      <div
        style={formStyle}
        onMouseEnter={(e) => (e.currentTarget.style.transform = formHoverStyle.transform)}
        onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
      >
        <h1 style={headingStyle}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style = { ...inputStyle, ...inputFocusStyle })}
              onBlur={(e) => (e.target.style = inputStyle)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              onBlur={(e) => (e.target.style = inputStyle)}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onFocus={(e) => (e.target.style = buttonFocusStyle)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
