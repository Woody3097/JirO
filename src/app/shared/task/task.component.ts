import { Component, Input, OnInit } from '@angular/core';
import { Customer, Manager, Performer } from 'src/app/shared/utils/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() private id: number = 0;
  @Input() private title: string = 'testTask';
  @Input() private creator: Manager | Customer = { name: 'John' };
  @Input() private performer: Performer = { name: 'Mike' };
  @Input() private startDate: Date = new Date();
  @Input() private endDate: Date = new Date();
  @Input() private description: string = '';

  constructor() { }

  ngOnInit(): void {}
}
