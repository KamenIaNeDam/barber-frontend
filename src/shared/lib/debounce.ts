

export function debounce(fn: (...args: any) => void, delay = 500) {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
}