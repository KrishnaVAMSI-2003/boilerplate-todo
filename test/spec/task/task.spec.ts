import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import { app } from '../helpers/helper.spec';
import TaskService from '../../../src/apps/backend/modules/task/task-service';
import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import AccessTokenWriter from '../../../src/apps/backend/modules/access-token/internal/access-token-writer';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import TaskRepository from '../../../src/apps/backend/modules/task/internal/store/task-repository';
import { TaskTypeEnum } from '../../../src/apps/backend/modules/task/types';

describe('API /api/accounts/:accountId/tasks', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  describe('GET', () => {
    it('should return a list of all tasks for a particular accountId', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password', email: faker.internet.email() };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );

      const accountId = account.id;

      const previousTasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(previousTasks.length).to.eq(0);

      for (let i = 0; i < 2; i++) {
        await TaskService.createTask({
          accountId,
          title: `${i}`,
          description: `${i}`,
          dueDate: new Date(),
          taskType: 'personal' as TaskTypeEnum,
        });
      }

      const beforeTestCreatedTasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(beforeTestCreatedTasks.length).to.eq(2);
      expect(accountId).to.not.be.undefined;
      expect(accessToken).to.not.be.undefined;

      const res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.eq(2);

      const afterTestCreatedtasks = await TaskService.getTasksForAccount({
        accountId,
      });
      expect(afterTestCreatedtasks.length).to.eq(2);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });

    it('should return a particular task', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password', email: faker.internet.email() };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;

      let res: any;
      let task: any;
      const params = {
        title: 'another simple task.',
        description: 'description',
        dueDate: new Date(),
        taskType: 'hobby' as TaskTypeEnum,
      };

      try {
        task = await TaskService.getTaskByTitleForAccount({
          accountId,
          title: params.title,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          title: params.title,
          description: params.description,
          dueDate: params.dueDate,
          taskType: params.taskType,
        });
      }

      const taskId = task.id;
      const taskTitle = task.title;
      const taskDescription = task.description;
      const taskDueDate = task.dueDate;
      const taskType = task.taskType;
      const taskIsCompleted = task.isCompleted;

      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });
      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.title).to.eq(taskTitle);
      expect(isTaskCreated.description).to.eq(taskDescription);
      expect(isTaskCreated.dueDate).to.eq(taskDueDate);
      expect(isTaskCreated.taskType).to.eq(taskType);
      expect(isTaskCreated.isCompleted).to.eq(taskIsCompleted);

      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.eq(taskTitle);
      expect(res.body.id).to.eq(taskId);

      const particularTask = await TaskService.getTaskForAccount({
        accountId,
        taskId: res.body.id,
      });
      expect(particularTask).not.to.be.undefined;
      expect(particularTask).to.have.property('id');
      expect(particularTask.id).to.eq(taskId);
      expect(particularTask.title).to.eq(taskTitle);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });

    it('should return 404 Not Found Error if task is deleted', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password', email: faker.internet.email() };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;
      let res: any;
      let task: any;
      const params = {
        title: 'very simple task.',
        description: 'description',
        dueDate: new Date(),
        taskType: 'hobby' as TaskTypeEnum,
      };

      try {
        task = await TaskService.getTaskByTitleForAccount({
          accountId,
          title: params.title,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          title: params.title,
          description: params.description,
          dueDate: params.dueDate,
          taskType: params.taskType,
        });
      }
      const taskId = task.id;

      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });
      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.title).to.eq(params.title);

      // trying to get task before deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.eq(params.title);
      expect(res.body.id).to.eq(taskId);

      // deleting the task with the given task Id
      res = await chai
        .request(app)
        .delete(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res).to.have.status(204);

      // trying to get task after soft deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Beare ${accessToken}`)
        .send();
      expect(res.status).to.eq(404);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });
  });

  describe('POST', () => {
    it('should create a new task', async () => {
      const params = {
        title: 'simple task.',
      };

      const accountParams = { username: faker.internet.userName(), password: 'password', email: faker.internet.email() };
      const account = await AccountWriter.createAccount(accountParams);
      const { token } = await AccessTokenWriter.createAccessToken(accountParams);

      await expect(
        TaskService.getTaskByTitleForAccount({
          accountId: account.id,
          title: params.title,
        }),
      ).to.be.rejectedWith(`Task with name ${params.title} not found.`);

      const res = await chai
        .request(app)
        .post(`/api/accounts/${account.id}/tasks`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(params);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('account');
      expect(res.body).to.have.property('name');
      expect(res.body.account).to.eq(account.id);
      expect(res.body.name).to.eq(params.title);

      const createdTask = await TaskService.getTaskForAccount({
        accountId: account.id,
        taskId: res.body.id,
      });
      expect(createdTask).to.have.property('id');
      expect(createdTask.id).to.eq(res.body.id);
      expect(createdTask.title).to.eq(params.title);

      await AccountRepository.accountDB.deleteOne({ _id: account.id });
      await TaskRepository.taskDB.deleteOne({ _id: res.body.id });
    });
  });

  describe('DELETE', () => {
    it('should change "active" flag of task to be false', async () => {
      const accountParams = { username: faker.internet.userName(), password: 'password', email: faker.internet.email() };
      const account = await AccountWriter.createAccount(accountParams);
      const { token: accessToken } = await AccessTokenWriter.createAccessToken(
        accountParams,
      );
      const accountId = account.id;
      let res: any;
      let task: any;

      const params = {
        title: 'simple task.',
        description: 'description',
        dueDate: new Date(),
        taskType: 'hobby' as TaskTypeEnum,
      };

      try {
        task = await TaskService.getTaskByTitleForAccount({
          accountId,
          title: params.title,
        });
      } catch (e) {
        task = await TaskService.createTask({
          accountId,
          title: params.title,
          description: params.description,
          dueDate: params.dueDate,
          taskType: params.taskType,
        });
      }

      const taskId = task.id;
      const isTaskCreated = await TaskService.getTaskForAccount({
        accountId,
        taskId,
      });

      expect(isTaskCreated).not.to.be.undefined;
      expect(isTaskCreated).to.have.property('id');
      expect(isTaskCreated).to.have.property('title');
      expect(isTaskCreated.id).to.eq(taskId);
      expect(isTaskCreated.title).to.eq(params.title);

      // deleting the task with the given task Id
      res = await chai
        .request(app)
        .delete(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send();
      expect(res).to.have.status(204);

      // trying to get task after soft deletion.
      res = await chai
        .request(app)
        .get(`/api/accounts/${accountId}/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Beare ${accessToken}`)
        .send();
      expect(res.body.httpStatusCode).to.eq(404);

      await AccountRepository.accountDB.deleteOne({ _id: accountId });
      await TaskRepository.taskDB.deleteMany({ account: accountId });
    });
  });
});
