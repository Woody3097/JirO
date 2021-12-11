import { ITask } from "./interfaces";

export abstract class Task {
  private taskInfo: ITask;

  protected constructor(taskInfo: ITask) {
    this.taskInfo = taskInfo;
  }

  get getTaskInfo(): ITask {
    return this.taskInfo;
  }

  set setTaskInfo(info: ITask) {
    this.taskInfo = info;
  }

  public clone() {};
}

export class Bug extends Task {
  readonly baseTaskNumber: number;

  constructor(taskInfo: ITask, baseTaskNumber: number) {
    super(taskInfo);
    this.baseTaskNumber = baseTaskNumber;
  }

  public override clone(): Bug {
    return new Bug(super.getTaskInfo, this.baseTaskNumber);
  }
}

export class Development extends Task {
  readonly sprintNumber: number;

  constructor(taskInfo: ITask, sprintNumber: number) {
    super(taskInfo);
    this.sprintNumber = sprintNumber;
  }

  public override clone(): Development {
    return new Development(super.getTaskInfo, this.sprintNumber);
  }
}
