import React from "react";
import "./App.css";

// import FancyButton from './FancyButton';
import FancyForm from "./FancyForm";
import AppUncontrolled from "./AppUncontrolled";
import AppControlled from "./AppControlled";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.state = {
			color: "green",
		};
	}

	focus = () => {
		this.setState((state) => ({
			color: state.color === "red" ? "blue" : "red",
		}));
		this.ref.current.focusInput();
	};

	render() {
		return <AppControlled></AppControlled>;
	}
}

export default App;
