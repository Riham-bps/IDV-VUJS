export enum Status {
    ToDo = "to do",
    InProgress = "in progress",
    Done = "done"
}


export interface Task {
    id: number | string,
    title: string,
    status: Status
}


// const task: Task = {
//     id: 123,
//     title: "task1",
//     status: Status.ToDo
// }
