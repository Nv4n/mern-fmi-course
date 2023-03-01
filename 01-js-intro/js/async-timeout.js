let x = 5;
setTimeout(() => {
	// eslint-disable-next-line no-debugger
	debugger;
	console.log('world');
}, 1000);
console.log('hello', x);
