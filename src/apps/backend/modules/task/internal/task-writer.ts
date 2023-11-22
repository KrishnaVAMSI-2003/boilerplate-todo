import {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithNameExistsError,
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
      throw new TaskWithNameExistsError(params.title);
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

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTaskForAccount(taskParams);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }
}
