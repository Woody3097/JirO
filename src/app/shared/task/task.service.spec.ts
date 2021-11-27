import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add task', () => {
    let testTask = {
      id: 0,
      title: '',
      performer: { name: '' },
      creator: { name: '' },
      startDate: '',
      endDate: '',
      description: '',
    }
    expect(service.getTasks.getValue.length).toEqual(0);
    service.addNewTask(testTask);
    expect(service.getTasks.value).toEqual([testTask]);
  });
});
