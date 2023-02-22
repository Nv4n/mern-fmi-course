import React, { useState } from "react";

export interface AppProps {
    name: string;
}

const AppLambda = (props: AppProps) => {
    const [counter, setCounter] = useState<number>(0);

    return (
        <div>
            <h2>Hello from {props.name} AppFunction Component</h2>
            <h2>{counter}</h2>
            <button onClick={() => setCounter(counter + 1)}>UPDATE</button>
        </div>
    );
};

export default AppLambda;
