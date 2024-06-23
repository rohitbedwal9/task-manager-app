import { ObjectId } from "mongoose";

export interface TaskType {
    _id:ObjectId;
    title: string;
    description: string;
    dueDate: string;
}