// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      alert("Logged in successfully");
      // redirect or refresh
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full" type="password" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
    </div>
  );
};

export default Login;
