import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from './shared/task/task.service';
import { ITask } from 'src/app/shared/utils/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { Bug, Development } from "./shared/utils/classes";
import { testTask } from "./shared/utils/mockData";

const printMemberName = (target: any, memberName: string) => {
  console.log(memberName);
};

function Confirmable(message: string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const allow = confirm(message);

      if (allow) {
        return original.apply(this, args);
      } else {
        return null;
      }
    };

    return descriptor;
  };
}

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
  @printMemberName
  public currentId: number = 0;
  public tasks: ITask[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(private taskService: TaskService) {
    this.taskService
      .getTasks
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
      this.tasks = res;
    });
  }

  taskCloningTest(): void {
    const task = new Bug({ ...testTask }, 10);
    const taskClone = task.clone();
    console.log(taskClone);
  }

  ngOnInit(): void {
    this.taskCloningTest()
    this.setCreator();

    this.testStateFunctionality();
  }

  public testStateFunctionality(): void {
    let task = new Development(testTask, 1);
    console.log(task.state);
    task.request();
    console.log(task.state);
  }

  public setCreator(): void {
    this.form.patchValue({ creator: { name: 'Michael' } })
  }

  @Confirmable('Are you sure?')
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
