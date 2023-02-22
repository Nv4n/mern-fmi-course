import React, { Component } from "react";
import { Todo } from "../model/todos";

interface TodoListProps {
    todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
    return (
        <ul>
            {todos.map((todo) => {
                return (
                    <li key={todo.id} data-status={todo.status}>
                        <h2>{todo.text}</h2>
                        <span>{todo.status}</span>
                    </li>
                );
            })}
        </ul>
    );
};
