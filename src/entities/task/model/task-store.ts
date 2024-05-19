import { makeAutoObservable, runInAction } from "mobx";
import { QueryParams, Todo } from "../../../shared/api/todos/model";
import { getTodo, getTodoById, updateTodo } from "../../../shared/api/todos";

class TaskStore {
  taskList: Todo[] = [];
  task?: Todo;
  isLoading = false;
  taskListError = "";
  taskError = "";
  isUpdateLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getTaskList = async (params: QueryParams) => {
    try {
      this.isLoading = true;

      const data = await getTodo(params);

      runInAction(() => {
        this.isLoading = false;
        this.taskList = data;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        if (error instanceof Error) {
          this.taskListError = error.message;
        }
      });
    }
  };

  getTask = async (id: string) => {
    try {
      this.isLoading = true;

      const data = await getTodoById(id);

      runInAction(() => {
        this.isLoading = false;
        this.task = data;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        if (error instanceof Error) {
          this.taskError = error.message;
        }
      });
    }
  };

  updateTodo = async (todo: Todo) => {
    try {
      this.isUpdateLoading = true;
      await updateTodo(todo);

      this.isUpdateLoading = false;
    } catch (error) {
      this.isUpdateLoading = false;
      throw error;
    }
  };
}

export const store = new TaskStore();
