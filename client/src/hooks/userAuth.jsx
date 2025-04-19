// src/hooks/useAuth.js
import { supabase } from '../lib/supabaseClient';

export const useAuth = () => {
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const getUser = () => supabase.auth.getUser();

  return { signUp, signIn, signOut, getUser };
};
