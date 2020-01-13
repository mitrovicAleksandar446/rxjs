import { fromEvent, Observable, of, throwError, Subject, interval } from "rxjs";
import { catchError, filter, mergeMap, take, takeUntil, tap, map } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

const source$ = interval(1000).pipe(
	take(4)
);

const sub$ = new Subject();
source$.subscribe(sub$);

sub$.subscribe(
	val => console.log(`Observer 1: ${val}`)
);

setTimeout(() => {
	sub$.subscribe(
		val => console.log(`Observer 2: ${val}`)
	);
}, 2000);








