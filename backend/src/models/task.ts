import { Schema, model } from 'mongoose';

interface ITask {
  title: string;
  description: string;
  dueDate: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
},{
  versionKey: false,
});

const Task = model<ITask>('Task', TaskSchema);

export default Task;
