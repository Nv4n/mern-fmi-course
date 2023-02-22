import { Todo } from "./todos";

let id: number = 1;
export const MOCK_TODOS = [
    new Todo(id, `Create Todo App using CRA Todo ${id++}`),
    new Todo(id, `Create TodoApp Todo ${id++}`),
    new Todo(id, `Create TodoList Todo ${id++}`),
    new Todo(id, `Create TodoItem Todo ${id++}`),
    new Todo(id, `Create TodoInput Todo ${id++}`),
    new Todo(id, `Create TodoFilter Todo ${id++}`),
    new Todo(id, `Debug application Todo ${id++}`),
    new Todo(id, `Add Todo Filter by status Todo ${id++}`),
    new Todo(id, `Improve styling Todo ${id++}`),
];
