import { Component, Input, OnInit } from '@angular/core';
import { Customer, Manager, Performer } from 'src/app/shared/utils/interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public title: string = 'testTask';
  @Input() public creator: Manager | Customer = { name: 'John' };
  @Input() public performer: Performer = { name: 'Mike' };
  @Input() public startDate: string = '';
  @Input() public endDate: string = '';
  @Input() public description: string = '';

  constructor() { }

  ngOnInit(): void {}
}
