const readline = require("readline");

// using loop
const sum_to_n_a = (n) => {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return sum;
};
// using tail recursion with trampoline to avoid stack overflow
const sum_to_n_b = (n) => {
	const sum = (n, acc = 0) => {
		if (n === 0) return acc;
		return () => sum(n - 1, acc + n);
	};
	const trampoline = (fn) => {
		let result = fn();
		while (typeof result === "function") {
			result = result();
		}
		return result;
	};
	return trampoline(() => sum(n));
};

// using formula
const sum_to_n_c = (n) => {
	return (n * (n + 1)) / 2;
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Enter a number: ", (answer) => {
	const n = parseInt(answer);
	console.log(`Sum to ${n} using loop: ${sum_to_n_a(n)}`);
	console.log(`Sum to ${n} using recursion: ${sum_to_n_b(n)}`);
	console.log(`Sum to ${n} using formula: ${sum_to_n_c(n)}`);
	rl.close();
});
