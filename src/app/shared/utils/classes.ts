import { ITask } from "./interfaces";

export abstract class Task {
  private taskInfo: ITask;
  public state: InProcessState | DoneState;

  protected constructor(taskInfo: ITask, state: InProcessState | DoneState) {
    this.taskInfo = taskInfo;
    this.state = state;
  }

  public request() {
    this.state.handle(this);
  }

  get getTaskInfo(): ITask {
    return this.taskInfo;
  }

  public clone() {};
}

export class Bug extends Task {
  readonly baseTaskNumber: number;

  constructor(taskInfo: ITask, baseTaskNumber: number) {
    super(taskInfo, new InProcessState());
    this.baseTaskNumber = baseTaskNumber;
  }

  public override clone(): Bug {
    return new Bug(super.getTaskInfo, this.baseTaskNumber);
  }
}

export class Development extends Task {
  readonly sprintNumber: number;

  constructor(taskInfo: ITask, sprintNumber: number) {
    super(taskInfo, new InProcessState());
    this.sprintNumber = sprintNumber;
  }

  public override clone(): Development {
    return new Development(super.getTaskInfo, this.sprintNumber);
  }
}

export abstract class TaskState {
  public handle(task: Task) {};
}

export class InProcessState extends TaskState {
  public override handle(task: Task) {
    task.state = new DoneState();
  }
}

export class DoneState extends TaskState {
  public override handle(task: Task) {
    task.state = new InProcessState();
  }
}
