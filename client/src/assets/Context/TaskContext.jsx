// src/Context/TaskContext.js

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        fetchData(data.user.id);
      } else {
        console.error("No user logged in:", error?.message);
      }
    };
    getUser();
  }, []);

  const fetchData = async (userId) => {
    const { data, error } = await supabase
      .from("Task")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    setTasks(data);
    setFilteredTasks(data);
    setTotalTasks(data.length);

    const completedCount = data.filter((task) => task.status === "completed").length;
    setCompletedTasks(completedCount);
    setTodoTasks(data.length - completedCount);
  };

  const handleFilterClick = (status) => {
    if (status === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  const addTask = async (title, description, status) => {
    if (!user) return;

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

    if (error) {
      console.error("Error adding task:", error);
      return;
    }

    const newTask = data[0];
    setTasks((prev) => [newTask, ...prev]);
    setFilteredTasks((prev) => [newTask, ...prev]);
    setTotalTasks((prev) => prev + 1);

    if (status === "completed") {
      setCompletedTasks((prev) => prev + 1);
    } else {
      setTodoTasks((prev) => prev + 1);
    }
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase.from("Task").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setTotalTasks(updatedTasks.length);

    const completedCount = updatedTasks.filter((task) => task.status === "completed").length;
    setCompletedTasks(completedCount);
    setTodoTasks(updatedTasks.length - completedCount);
  };

  const editTask = async (taskId, updatedTitle, updatedDescription, updatedStatus) => {
    const { error } = await supabase
      .from("Task")
      .update({
        task: updatedTitle,
        description: updatedDescription,
        status: updatedStatus,
      })
      .eq("id", taskId);

    if (error) {
      console.error("Error editing task:", error);
    } else {
      fetchData(user.id);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    const { error } = await supabase
      .from("Task")
      .update({ status })
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task status:", error);
      return;
    }

    fetchData(user.id);
  };

  return (
    <TaskContext.Provider
      value={{
        filteredTasks,
        totalTasks,
        completedTasks,
        todoTasks,
        handleFilterClick,
        addTask,
        deleteTask,
        editTask,
        updateTaskStatus,
        fetchData,
        user,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
