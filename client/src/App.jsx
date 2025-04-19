import './App.css';
import Filterbar from './Components/Filterbar';
import Navbar from './Components/Navbar';
import { TaskProvider } from './assets/Context/TaskContext';
import Tasks from "./Components/TaskList";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Auth/register';
import Login from './Auth/login';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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
                <Tasks />
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
