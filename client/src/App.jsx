// App.js
import './App.css';
import Filterbar from './Components/Filterbar';
import Navbar from './Components/Navbar';
import { TaskProvider } from './assets/Context/TaskContext';
import Tasks from "./Components/TaskList";
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Auth/register';
import Login from './Auth/login';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // 🚀 Add loading state

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setAuthLoading(false); // ✅ done loading
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (authLoading) return <div className="text-center mt-10">Loading...</div>; // 🔄 Delay render

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <TaskProvider>
                <Navbar />
                <Filterbar />
                <div className="flex flex-col lg:flex-row gap-2 justify-center">
                  <div className="w-full basis-3/4">
                    <Tasks />
                  </div>
                  <div className="w-full basis-1/4">
                    <Dashboard />
                  </div>
                </div>
              </TaskProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
