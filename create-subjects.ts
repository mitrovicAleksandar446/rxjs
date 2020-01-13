import { fromEvent, Observable, of, throwError, Subject } from "rxjs";
import { catchError, filter, mergeMap, take, takeUntil, tap, map } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

const sub$ = new Subject();

sub$.subscribe(
	val => console.log(`Observer 1: ${val}`)
);

sub$.subscribe(
	val => console.log(`Observer 2: ${val}`)
);

sub$.next("Hello !");

const source$ = new Observable(subscriber => {
	subscriber.next('Greetings!');
});

source$.subscribe(sub$);






