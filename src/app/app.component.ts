import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from './shared/task/task.service';
import { Task } from 'src/app/shared/utils/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    performer: new FormControl('', Validators.required),
    creator: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  public currentId: number = 0;
  public tasks: Task[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(private taskService: TaskService) {
    this.taskService
      .getTasks
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
      this.tasks = res;
    });
  }

  ngOnInit(): void {
    this.setCreator();
  }

  public setCreator(): void {
    this.form.patchValue({ creator: { name: 'Michael' } })
  }

  public createTask(): void {
    this.form.patchValue({ id: ++this.currentId })
    this.form.patchValue({ performer: { name: this.getFormValue('performer') } })
    this.taskService.addNewTask(this.form.value);
    this.form.reset();
  }

  private getFormValue(control: string): string {
    return this.form.get(control)?.value;
  }
}
