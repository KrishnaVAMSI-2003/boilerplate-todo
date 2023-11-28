import {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithTitleExistsError,
  UpdateTaskParams,
  UpdateTaskStatusParams
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const existingTask = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      title: params.title,
    });
    if (existingTask) {
      throw new TaskWithTitleExistsError(params.title);
    }
    const createdTask = await TaskRepository.taskDB.create({
      accountId: params.accountId,
      title: params.title,
      isCompleted: false,
      dueDate: params.dueDate,
      taskType: params.taskType,
      description: params.description,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    task.title = params.title;
    task.description = params.description;
    task.dueDate = params.dueDate;
    task.taskType = params.taskType;
    task.isCompleted = params.isCompleted;
    const updatedTask = await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        taskType: task.taskType,
        isCompleted: task.isCompleted,
      }
    );
    return TaskUtil.convertTaskDBToTask(updatedTask);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    await TaskRepository.taskDB.findOneAndDelete(
      {
        _id: task.id,
      }
    );
  }

  public static async updateTaskStatus(params: UpdateTaskStatusParams): Promise<Task> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    task.isCompleted = !task.isCompleted;
    
    const updatedTask = await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        isCompleted: task.isCompleted,
      }
    );
    return TaskUtil.convertTaskDBToTask(updatedTask);
  }
}
