import { fromEvent, Observable, of, throwError, Subject, interval, ConnectableObservable } from "rxjs";
import { catchError, filter, mergeMap, take, takeUntil, tap, map, multicast, refCount, publish, share } from "rxjs/operators";

const source$: ConnectableObservable<number> = interval(1000).pipe(
	take(4),
	// will need to call connect() to start publishing data
	//multicast(new Subject()),
	// Same as multicast(), but Subject is not needed, it's created in the background
	//publish(),
	// starts publishing data as soon as one observer is subscribed
	//refCount(),
	// similar as refCount() (it's internally used), but for late subscribers, it will re-publish the data
	share(),
);

// const sub$ = new Subject();
// source$.subscribe(sub$);

source$.subscribe(
	val => console.log(`Observer 1: ${val}`)
);

setTimeout(() => {
	source$.subscribe(
		val => console.log(`Observer 2: ${val}`)
	);
}, 2000);

setTimeout(() => {
	source$.subscribe(
		val => console.log(`Observer 3: ${val}`),
		null,
		() => console.log('Observer 3 completed...')
	);
}, 7500);

//source$.connect();








