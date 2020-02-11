import {
  of,
  asyncScheduler,
  asapScheduler,
  queueScheduler,
  merge,
  from
} from "rxjs";
import {
  observeOn,
  tap,
} from "rxjs/operators";

console.log('start script...');

const queue$ = of('Queue', queueScheduler);
const asap$ = of('Asap', asapScheduler);
const async$ = of('Async', asyncScheduler);

merge(queue$, asap$, async$)
  .subscribe(val => console.log(val));

from([1, 2, 3, 4])
  .pipe(
    tap(val => console.log(`Single value: ${val}`)),
    observeOn(asapScheduler),
    tap(val => console.log(`Double value: ${val * 2}`)),
  )
  .subscribe();

console.log('end script...');








