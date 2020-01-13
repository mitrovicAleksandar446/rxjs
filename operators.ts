import { fromEvent, Observable, of, throwError } from "rxjs";
import { catchError, filter, mergeMap, take, takeUntil, tap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

ajax('/api/errors/500')
	.pipe(
		mergeMap(ajaxResponse => ajaxResponse.response),
		filter(book => book.publicationYear < 1950),
		tap(oldBook => console.log(`Title: ${oldBook.title}`)),
		// send error to global error handler
		//catchError(err => throw `Greska!! - ${err.message}`)
		// silence error
		//catchError(err => of({title: 'Error title', author: 'Error author'}))
		// Returning error Observable
		catchError(err => throwError(err))
	)
	.subscribe(
		val => console.log(`VALUE: ${val.title}`),
		err => console.log(`ERROR: ${err}`)
	);

const cancelTimerBtn = document.getElementById('cancelTimerButton');
const timesDiv = document.getElementById('times');
const interval$ = new Observable(subscriber => {
	let i = 0;
	const interval = setInterval(() => {
		subscriber.next(i++);
	}, 1000);

	return () => {
		console.log('Teardown logic....');
		clearInterval(interval);
	};
});

// This one, unlike unsubscribe() method, will call complete() handler
const cancelTimeObservable$ = fromEvent(cancelTimerBtn, 'click');
interval$
	.pipe(
		//take(3)
		takeUntil(cancelTimeObservable$)
	)
	.subscribe(val => timesDiv.innerHTML += new Date().toLocaleTimeString() + `(${val})<br>`,
		null,
		() => console.log('All done !')
	);





