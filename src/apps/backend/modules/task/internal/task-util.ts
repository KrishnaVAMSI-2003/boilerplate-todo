import { Task } from '../types';

import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.accountId = taskDb.accountId.toString();
    task.title = taskDb.title;
    task.description = taskDb.description;
    task.dueDate = taskDb.dueDate;
    task.taskType = taskDb.taskType;
    task.isCompleted = taskDb.isCompleted;
    return task;
  }
}
