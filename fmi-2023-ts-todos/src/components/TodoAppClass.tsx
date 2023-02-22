import React, { Component } from "react";
import { MOCK_TODOS } from "../model/mock-todos";
import { Todo } from "../model/todos";
import { TodoList } from "./TodoList";

interface AppState {
    todos: Todo[];
}

export default class TodoAppComponent extends Component<{}, AppState> {
    state: Readonly<AppState> = {
        todos: MOCK_TODOS,
    };

    public render() {
        return (
            <div>
                <h2>Todo List</h2>
                <h2>Counter: {this.state.todos.length}</h2>
                <TodoList todos={this.state.todos}></TodoList>
            </div>
        );
    }
}
