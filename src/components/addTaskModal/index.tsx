'use client';
import { useState } from 'react';
import axios from 'axios';
import { TaskType } from '../types';

const AddTaskModal = ({
  setShowModal,
  setTasks,
}: {
  setShowModal: (show: boolean) => void;
  setTasks: (updateFn: (tasks: TaskType[]) => TaskType[]) => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        dueDate,
      });
      // Assuming the returned data has a structure { task: TaskType }
      setTasks((prevTasks) => [...prevTasks, data.task]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setShowModal(false);
    } catch (error) {
      console.log('Error creating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mb-2 w-full rounded-lg border"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 mb-2 w-full rounded-lg border min-h-32 max-h-32"
            required
          ></textarea>
          <input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 mb-2 w-full rounded-lg border"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
