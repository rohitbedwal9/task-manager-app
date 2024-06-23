'use client';
import TaskList from '../components/taskList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TaskType } from '../components/types';
import AddTaskModal from '@/components/addTaskModal';

const Home = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tasks');
        setTasks(data.tasks);
      } catch (error) {
        console.log('Error getting tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container min-h-screen mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white p-2 rounded-lg mb-4"
      >
        Add Task
      </button>
      <hr className="my-4" />
      <TaskList tasks={tasks} setTasks={setTasks} />
      {showAddModal && (
        <AddTaskModal setShowModal={setShowAddModal} setTasks={setTasks} />
      )}
    </div>
  );
};

export default Home;
