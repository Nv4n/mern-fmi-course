import React, { Component } from "react";

interface AppProps {
    name: string;
}
interface AppState {
    counter: number;
}

export default class AppClass extends Component<AppProps, AppState> {
    state: Readonly<AppState> = {
        counter: 0,
    };
    interval: NodeJS.Timer | undefined = undefined;

    componentDidMount(): void {
        this.interval = setInterval(() => {
            this.setState(({ counter }) => ({ counter: counter + 1 }));
        }, 1000);
    }
    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div>
                <h2>Hello from {this.props.name} Component</h2>
                <h2>{this.state.counter}</h2>
                <button
                    disabled={true}
                    onClick={() =>
                        this.setState(({ counter }) => ({
                            counter: counter + 1,
                        }))
                    }
                >
                    Update Counter
                </button>
            </div>
        );
    }
}
