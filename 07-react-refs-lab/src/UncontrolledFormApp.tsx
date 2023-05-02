import { useRef } from "react";
import "./App.css";
import { UncontrolledFormLambda } from "./components/UncontrolledFormLambda";

function App() {
	const ref = useRef<typeof UncontrolledFormLambda>();
	return (
		<div className="App">
			<header className="App-header">
				<UncontrolledFormLambda ref={ref} />
				<button onClick={() => console.log(ref.current)}>
					Click me
				</button>
			</header>
		</div>
	);
}

export default App;
