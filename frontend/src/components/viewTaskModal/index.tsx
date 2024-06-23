import React from 'react';
import { TaskType } from '../types';

const ViewTaskModal = ({
  task,
  setShowModal,
}: {
  task: TaskType;
  setShowModal: (show: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 px-2 sm:mx-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTaskModal;
