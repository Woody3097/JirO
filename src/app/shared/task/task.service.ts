import { Injectable } from '@angular/core';
import { Task } from '../utils/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() { }

  public addNewTask(task: Task): void {
    const tasks = this.tasks$.getValue();
    this.tasks$.next([...tasks, task]);
  }

  get getTasks(): BehaviorSubject<Task[]> {
    return this.tasks$;
  }

  public deleteTask(id: number): void {
    const tasks = this.tasks$.getValue();
    this.tasks$.next(tasks.filter((el: Task) => el.id !== id));
  }
}
