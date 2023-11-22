import {  Schema, Types } from 'mongoose';
import { TaskTypeEnum } from '../../types';

export interface TaskDB {
  _id: Types.ObjectId;
  accountId: Types.ObjectId;
  isCompleted: boolean;
  title: string;
  description: string;
  taskType: TaskTypeEnum;
  dueDate: Date;
}

export const taskDbSchema: Schema = new Schema<TaskDB>(
  {
    isCompleted: { type: Boolean, required: true, default: false },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    title: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required:true
    },
    dueDate: {
      type: Date,
      required: true,
      index: true,
    },
    taskType: {
      type: String,
      enum: Object.values(TaskTypeEnum),
      required: true,
    },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
