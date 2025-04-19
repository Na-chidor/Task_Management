import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Welcome, ${data.user.email}`);
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm mt-3 text-center">
          Don't have an account? <Link className="text-blue-500" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
