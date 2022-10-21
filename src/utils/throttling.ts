import { Observable, skip, switchMap, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function throttling<T>(time: number, selector: (arg: T) => Observable<T>) {
  return (source$: Observable<T>): Observable<T> =>
    source$.pipe(
      debounceTime(time),
      switchMap((arg: T) => selector(arg).pipe(takeUntil(source$.pipe(skip(1)))))
    );
}
