import { Observable, OperatorFunction } from "rxjs";

/**
 * use this when you want to stop emissions when the source value is null or undefined 
 * any other value (even falsy ones such as 0 or '') will keep emitting
 * this operator is inspired from https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457
 * @returns 
 */
export function filterNullAndUndefined<ExpectedOject>(): OperatorFunction<ExpectedOject | null | undefined, ExpectedOject> {
    return (source: Observable<ExpectedOject | null | undefined>): Observable<ExpectedOject> => {
        return new Observable(subscriber => {
            source.subscribe({
                next(value) {
                    if(value !== undefined && value !== null) {
                    subscriber.next(value);
                    }
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        })
    }
}

/**
 * utility function to automatically complete an observable once the first value is emitted
 * @returns 
 */
export function autoComplete(): OperatorFunction<unknown, unknown> {
    return (source: Observable<unknown>): Observable<unknown> => {
        return new Observable(subscriber => {
            source.subscribe({
                next(value) {
                    subscriber.next(value);
                    subscriber.complete();
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        })
    }
}

/**
 * utility function to easily log in observable pipes
 * @param identifier 
 * @returns 
 */
export function logger<EntryData>(identifier: string): OperatorFunction<EntryData, EntryData> {
    return (source: Observable<EntryData>): Observable<EntryData> => {
        return new Observable(subscriber => {
            source.subscribe({
                next(value) {
                    console.log(identifier, 'next', value);
                    subscriber.next(value);
                },
                error(error) {
                    console.error(identifier, 'error', error);
                    subscriber.error(error);
                },
                complete() {
                    console.warn(identifier, 'complete');
                    subscriber.complete();
                }
            })
        })
    } 
}