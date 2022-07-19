import { createStore } from "solid-js/store";

let currentId = 1;

interface Growl {
	id: number;
	type: 'error' | 'warn' | 'info';
	title: string;
	message: string;
	timeout: number;
}

const [growls, setGrowls] = createStore<Growl[]>([]);

export function dismissGrowl(id: number) {
	setGrowls(growls => growls.filter(growl => growl.id !== id));
}

export function addGrowl(growl: Omit<Growl, 'id'>) {
	setGrowls(growls => growls.concat({
		id: currentId ++,
		...growl
	}))
}

export { growls };
