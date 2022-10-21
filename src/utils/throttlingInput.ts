// THROTTLING
import { catchError, debounceTime, filter, map, Observable, of, skip, switchMap, takeUntil } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { ICity } from '../interfaces/Interfaces';
import { capitalize } from './capitalize';
import { serverURL } from '../App';

export type ResponseOptions = { _id: number; name: string }[] | { error: boolean; message: string };

// Here we convert server response into antd-autocomplete-compatible array
export const refineResponseOptions = (responseArray: ResponseOptions): ICity[] => {
  if (Array.isArray(responseArray)) {
    return responseArray.map((el) =>
      (({ name, _id }) => ({
        _id,
        value: capitalize(name),
      }))(el)
    );
  }
  return [];
};

// It's a HOO, it receives time of debounce,function for getting
// list of suggestions from server, and source stream. It denounces
// function and returns result only if source stream really stops.
export const autocomplete =
  (time: number, selector: (arg: string) => Observable<ResponseOptions>) =>
  (source$: Observable<string>): Observable<ICity[]> =>
    source$.pipe(
      debounceTime(time),
      filter((str) => str.trim() !== ''),
      switchMap((arg: string) => selector(arg).pipe(takeUntil(source$.pipe(skip(1))))),
      map(refineResponseOptions)
    );

// This is a function for getting list of suggestions from the server
export const fetch$ = (term: string): Observable<ResponseOptions> =>
  fromFetch(`${serverURL}/routes/cities?name=${term}`).pipe(
    switchMap((response) => {
      if (response.ok) {
        // OK return data
        return response.json();
      }
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` });
    }),
    catchError((err) =>
      // Network or other error, handle appropriately
      of({ error: true, message: err.message })
    )
  );
