import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from './shared/utils/interfaces';

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
  public tasks: Task[] = []
  public currentId: number = 0;

  ngOnInit(): void {
    this.setCreator();
  }

  public setCreator(): void {
    this.form.patchValue({ creator: { name: 'Michael' } })
  }

  public createTask(): void {
    this.form.patchValue({ id: ++this.currentId })
    this.tasks.push(this.form.value);
  }
}
