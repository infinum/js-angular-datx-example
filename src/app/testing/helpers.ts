import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Create async observable that emits-once and completes after a JS engine turn.
 * Documentation: https://angular.io/guide/testing-components-scenarios#async-observable-helpers
 */
export function asyncData<TData>(data: TData): Observable<TData> {
	return of(data).pipe(delay(0));
}
