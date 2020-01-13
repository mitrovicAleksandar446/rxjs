import { Observable, interval, fromEvent } from "rxjs";

const currentTime$ = new Observable(subscriber => {
	const timeString = new Date().toLocaleTimeString();
	subscriber.next(timeString);
	subscriber.complete();
});

currentTime$.subscribe(currTime => console.log(`Observer 1: ${currTime}`));

setTimeout(() => {
	currentTime$.subscribe(currTime => console.log(`Observer 2: ${currTime}`));
}, 1000);

setTimeout(() => {
	currentTime$.subscribe(currTime => console.log(`Observer 3: ${currTime}`));
}, 2000);

const cancelTimerBtn = document.getElementById('cancelTimerButton');
const timesDiv = document.getElementById('times');
//const interval$ = interval(1000);
const interval$ = new Observable(subscriber => {
	let i = 0;
	const interval = setInterval(() => {
		subscriber.next(i++);
	}, 1000);

	return () => {
		clearInterval(interval);
	};
});

const intervalSubscription = interval$.subscribe(val => timesDiv.innerHTML += new Date().toLocaleTimeString() + `(${val})<br>`);
const consoleIntervalSubscription = interval$.subscribe(val => console.log(new Date().toLocaleTimeString() + `(${val})`));

intervalSubscription.add(consoleIntervalSubscription);

fromEvent(cancelTimerBtn, 'click')
	.subscribe(event => {
		intervalSubscription.unsubscribe();
	});




