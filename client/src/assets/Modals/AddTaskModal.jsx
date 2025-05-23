// src/components/AddTaskModal.jsx

import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

function AddTaskModal({ isOpen, closeModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to-do');
  const [loading, setLoading] = useState(false);

  const { addTask } = useTaskContext();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    
    await addTask(title, description, status);
    toast.success("Task added successfully!");
    
    setTitle('');
    setDescription('');
    setStatus('to-do');
    closeModal();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white w-full md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Add New Task</CardTitle>
          <Button variant="ghost" size="sm" className={"cursor-pointer"} onClick={closeModal}>
            ✕
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="to-do">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            disabled={loading}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 w-full"
            onClick={handleSubmit}
          >
            {loading ? 'Adding...' : 'Add Task'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTaskModal;
