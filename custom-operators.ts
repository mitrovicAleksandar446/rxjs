import { fromEvent, Observable, of, throwError } from "rxjs";
import { catchError, filter, mergeMap, take, takeUntil, tap, map } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

function grabAndLogClassics(year, log) {
	return source$ => {
		return new Observable(subscriber => {

			return source$.subscribe(
				book => {
					if(book.publicationYear < year) {
						subscriber.next(book);
						if (log) {
							console.log(`Classic: ${book.title}`);
						}
					}
				},
				err => subscriber.error(err),
				() => subscriber.complete(),
			);
		});
	}
}

function grabClassics(year) {
	return filter(book => book.publicationYear < year);
}

function grabAndLogClassicsWithPipe(year, log) {
	return source$ => source$.pipe(
		filter(book => book.publicationYear < year),
		tap(classicBook => log ? console.log(`Title: ${classicBook.title}`) : null),
	)
}

ajax('/api/books')
	.pipe(
		mergeMap(ajaxResponse => ajaxResponse.response),
		grabAndLogClassics(1950, true),
		//grabClassics(1950),
		//grabAndLogClassicsWithPipe(1950, true),
		catchError(err => throwError(err))
	)
	.subscribe(
		val => console.log(`VALUE: ${val.title}`),
		err => console.log(`ERROR: ${err}`)
	);




