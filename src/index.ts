import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
fromEvent(document, 'click').pipe(map((x:any) => {
    console.log(x);
    return 0;
})).subscribe((x: any) => {
    console.log(x);
});