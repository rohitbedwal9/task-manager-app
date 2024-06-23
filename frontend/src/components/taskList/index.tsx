'use client';
import { TaskType } from '../types';
import axios from 'axios';
import { ObjectId } from 'mongoose';
import { useState } from 'react';
import EditTaskModal from '../editTaskModal';
import ViewTaskModal from '../viewTaskModal';

const TaskList = ({
  tasks,
  setTasks,
}: {
  tasks: TaskType[];
  setTasks: (updateFn: (tasks: TaskType[]) => TaskType[]) => void;
}) => {
  const [showModel, setShowModel] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const onView = (task: TaskType) => { 
    setCurrentTask(task);
    setShowViewModal(true);
  };

  const onEdit = (task: TaskType) => {
    setCurrentTask(task);
    setShowModel(true);
  };

  const onDelete = async (taskId: ObjectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  const handleUpdate = (updatedTask: TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  return (
    <div>
      {showModel && currentTask && (
        <EditTaskModal
          task={currentTask}
          setShowModal={setShowModel}
          handleUpdate={handleUpdate}
        />
      )}
      {showViewModal && currentTask && (
        <ViewTaskModal
          task={currentTask}
          setShowModal={setShowViewModal}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid sm:grid-cols-2 gap-4 ">
        {tasks &&
          tasks.map((task) => (
            <div className="flex justify-between bg-blue-200 p-3 rounded-lg shadow-lg">
              <div key={task._id}>
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p className="overflow-ellipsis">{task.description.substring(0,30)}</p>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <button title="edit" type="button" onClick={() => onEdit(task)}>
                  <svg
                    width="24px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  title="delete"
                  type="button"
                  onClick={() => onDelete(task._id)}
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 12V17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 7H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button type='button' title='view' onClick={() => onView(task)}>
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
