// components/EditTaskModal.tsx

'use client';
import { useState } from 'react';
import { TaskType } from '../types';
import axios from 'axios';

const EditTaskModal = ({
  task,
  setShowModal,
  handleUpdate,
}: {
  task: TaskType;
  setShowModal: (show: boolean) => void;
  handleUpdate: (task: TaskType) => void;
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          title,
          description,
          dueDate,
        }
      );
      handleUpdate(data.task);
      setShowModal(false);
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
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
          className="p-2 mb-2 w-full rounded-lg border"
          required
        ></textarea>
        <input
          type="date"
          placeholder="Due Date"
          value={new Date(dueDate).toISOString().split('T')[0]}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 mb-2 w-full rounded-lg border"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg mr-2"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white p-2 rounded-lg"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
