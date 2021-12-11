import { Injectable } from '@angular/core';
import { ITask } from '../utils/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

  constructor() { }

  public addNewTask(task: ITask): void {
    const tasks = this.tasks$.getValue();
    this.tasks$.next([...tasks, task]);
  }

  get getTasks(): BehaviorSubject<ITask[]> {
    return this.tasks$;
  }

  public deleteTask(id: number): void {
    const tasks = this.tasks$.getValue();
    this.tasks$.next(tasks.filter((el: ITask) => el.id !== id));
  }
}
