import { fromEvent, Observable, of, throwError, Subject, interval, ConnectableObservable } from "rxjs";
import {
	take,
	refCount,
	publishReplay,

} from "rxjs/operators";

const source$: ConnectableObservable<number> = interval(1000).pipe(
	take(4),
	// to every observer, publish last value
	//publishLast(),
	// publish seed value to immediately subscribed, and continue behave like publish()
	// publishBehavior(42),
	// buffers already published values to every new observer
	publishReplay(),
	refCount(),
);

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









