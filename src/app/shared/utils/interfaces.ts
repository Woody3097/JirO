export interface Manager {
  name: string
}

export interface Customer {
  name: string
}

export interface Performer {
  name: string
}

export interface Task {
  id: number
  title: string
  creator: Manager | Customer
  performer: Performer
  startDate: string
  endDate: string
  description: string;
}
