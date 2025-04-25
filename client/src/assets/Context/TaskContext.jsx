import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        if (!data?.user) throw new Error("No user logged in");

        setUser(data.user);
        await fetchData(data.user.id);
      } catch (err) {
        console.error("Authentication error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Fetch tasks from Supabase
  const fetchData = async (userId) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("Task")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setTasks(data || []);
      setFilteredTasks(data || []);
      setTotalTasks(data?.length || 0);

      const completedCount = data?.filter(t => t.status === "completed").length || 0;
      const todoCount = data?.filter(t => t.status === "to-do").length || 0;
      const inProgressCount = data?.filter(t => t.status === "in-progress").length || 0;

      setCompletedTasks(completedCount);
      setTodoTasks(todoCount);
      setInProgressTasks(inProgressCount);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on status
  const handleFilterClick = (status) => {
    if (status === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  // Add a new task
  const addTask = async (title, description, status) => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Task")
        .insert([
          {
            task: title,
            description,
            status,
            user_id: user.id,
          },
        ])
        .select();

      if (error) throw error;

      await fetchData(user.id);
    } catch (err) {
      console.error("Error adding task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("Task").delete().eq("id", taskId);
      if (error) throw error;
      await fetchData(user.id);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit a task
  const editTask = async (taskId, updatedTitle, updatedDescription, updatedStatus) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("Task")
        .update({
          task: updatedTitle,
          description: updatedDescription,
          status: updatedStatus,
        })
        .eq("id", taskId);

      if (error) throw error;

      await fetchData(user.id);
      return true;
    } catch (err) {
      console.error("Error editing task:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        totalTasks,
        completedTasks,
        todoTasks,
        inProgressTasks,
        handleFilterClick,
        addTask,
        deleteTask,
        editTask,
        fetchData,
        user,
        loading,
        error
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};