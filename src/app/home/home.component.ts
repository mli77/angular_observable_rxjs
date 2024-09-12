import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable, of, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });


    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });


    const myObservable = of(42); from(['bonjour', 'le', 'monde']);

    myObservable.subscribe((value) => {
        console.log(value);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Fini !');
    });

    const myObservable2 = from(['bonjour', 'le', 'monde']);

    myObservable2.subscribe((value) => {
        console.log(value);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Fini !');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
