import { Observable, of, from, fromEvent, concat } from "rxjs";
import { ajax } from "rxjs/ajax";
import { allBooks, allReaders } from "./data";

const allBooksObservable$ = new Observable(subscriber => {

	if (document.title !== 'RxBookTracker') {
		subscriber.error('Incorrect title name');
	}

	for (const book of allBooks) {
		subscriber.next(book);
	}

	setTimeout(() => subscriber.complete(), 2000);

	// It will automatically be called after complete or error method call
	return () => console.log('Teardown code');
});

allBooksObservable$.subscribe(book => console.log(book.title));
const source1$ = of('hello', 10, true, allReaders[0].name);
source1$.subscribe(val => console.log(val));
const source2$ = from(allBooks);
source2$.subscribe(val => console.log(val));
const source3$ = concat(source1$, source2$);
source3$.subscribe(val => console.log(val));

const btn = document.getElementById('readersButton');
const readersDiv = document.getElementById('readers');

fromEvent(btn, 'click')
	.subscribe(event => {
		console.log(event);

		for (const reader of allReaders) {
			readersDiv.innerHTML += reader.name + '<br>';
		}
	});

fromEvent(btn, 'click')
	.subscribe(event => {

		ajax('/api/readers')
			.subscribe(ajaxResponse => {
				const readers = ajaxResponse.response;
				for (const reader of readers) {
					readersDiv.innerHTML += reader.name + '<br>';
				}
			});
	});
