import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import AppClass from "./AppClass";
import AppFunction from "./AppFunction";
import AppLambda from "./AppLambda";
import TodoAppComponent from "./components/TodoAppClass";

function App() {
    const [name, setName] = useState("UNKNOWN");

    return (
        <div className="App">
            <header className="App-header">
                <TodoAppComponent></TodoAppComponent>
            </header>
        </div>
    );
}

export default App;
